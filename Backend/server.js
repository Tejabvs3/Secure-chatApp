const express = require('express');
const app = express();
const { Server } = require('socket.io');
const http = require('http');
const server = http.createServer(app);
const cors = require('cors');
const User = require('./models/User');
const Message = require('./models/Message');
const userRoutes = require('./routes/userRoutes');

const rooms = ["general", "tech", "games", "academics", "movies"];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// CORS Middleware
app.use(cors());

// User routes
app.use('/users', userRoutes);

// Database connection
require('./connection');

// Socket.io CORS Configuration
const port = process.env.PORT_BACKEND;
const frontendURL = removeTrailingSlash(process.env.URL_FRONTEND);
const io = new Server(server, {
  cors: {
    origin: frontendURL, // Ensure the frontend URL is passed without trailing slash
    methods: ['GET', 'POST'],
  },
});

// Utility function to remove trailing slash
function removeTrailingSlash(url) {
  if (url.endsWith('/')) {
    return url.slice(0, -1);
  }
  return url;
}

// MongoDB Aggregation and Sorting Functions
async function getLastMessagesFromRoom(room) {
  let roomMessages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: '$date', messagesByDate: { $push: '$$ROOT' } } },
  ]);
  return roomMessages;
}

function sortRoomMessagesByDate(messages) {
  return messages.sort((a, b) => {
    let date1 = a._id.split('/');
    let date2 = b._id.split('/');

    date1 = date1[2] + date1[0] + date1[1];
    date2 = date2[2] + date2[0] + date2[1];

    return date1 < date2 ? -1 : 1;
  });
}

// Socket Connection Logic
io.on('connection', (socket) => {
  socket.on('new-user', async () => {
    const members = await User.find();
    io.emit('new-user', members);
  });

  socket.on('join-room', async (newRoom, previousRoom) => {
    socket.join(newRoom);
    socket.leave(previousRoom);
    let roomMessages = await getLastMessagesFromRoom(newRoom);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    socket.emit('room-messages', roomMessages);
  });

  socket.on('message-room', async (room, content, sender, time, date) => {
    const newMessage = await Message.create({ content, from: sender, time, date, to: room });
    let roomMessages = await getLastMessagesFromRoom(room);
    roomMessages = sortRoomMessagesByDate(roomMessages);
    io.to(room).emit('room-messages', roomMessages);
    socket.broadcast.emit('notifications', room);
  });

  app.delete('/logout', async (req, res) => {
    try {
      const { _id, newMessages } = req.body;
      const user = await User.findById(_id);
      user.status = "offline";
      user.newMessages = newMessages;
      await user.save();
      const members = await User.find();
      socket.broadcast.emit('new-user', members);
      res.status(200).send();
    } catch (e) {
      console.log(e);
      res.status(400).send();
    }
  });

  app.get('/rooms', (req, res) => {
    res.json(rooms);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
