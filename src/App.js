import './App.css';
import Navigation from './components/Navigation';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import Chat from './pages/Chat';
import { AppContext, socket } from "./context/appContext";
import { useState } from 'react';
import Logout from './pages/Logout';

function App() {
  const [rooms, setRooms] = useState([]);
    const [currentRoom, setCurrentRoom] = useState([]);
    const [members, setMembers] = useState([]);
    const [messages, setMessages] = useState([]);
    const [privateMemberMsg, setPrivateMemberMsg] = useState({});
    const [newMessages, setNewMessages] = useState({});
  return (
    <AppContext.Provider value={{ socket, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMemberMsg, setPrivateMemberMsg, rooms, setRooms, newMessages, setNewMessages }}>
    <BrowserRouter>
    <Navigation />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Chat" element={<Chat />} /> 
      <Route path="/Logout" element={<Logout/>} />
    </Routes>
    </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
