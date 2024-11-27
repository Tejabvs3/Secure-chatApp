const router = require('express').Router();
const User = require('../models/User');

//register new user
router.post('/', async (req, res) => {
    try {
    const { username, email, password, picture } = req.body;
    console.log(req.body);
    const user = await User.create({username, email, password, picture});
    res.status(201).json(user);
    } catch (err) {
        let msg;
        if (err.code === 11000) {
            msg = "Email already exists";
        } else {
            msg = err.message;
        }
        console.log(msg);
        res.status(400).json(msg);
    }
});
/*
router.post('/', async (req, res) => {
  try {
    const { username, email, password, picture } = req.body;
    console.log(req.body);

    // Create a new instance of User
    const user = new User({ username, email, password, picture });

    // Save the user to the database
    await user.save();

    res.status(201).json(user);
  } catch (err) {
    let msg;
    if (err.code === 11000) {
      msg = "Email already exists";
    } else {
      msg = err.message;
    }
    console.log(msg);
    res.status(400).json(msg);
  }
});

//here instead of create used new instance to create new user object and saved explicitly..so create combines these two tasks*/

// login user

router.post('/login', async(req, res)=> {
    try {
      const {email, password} = req.body;
      const user = await User.findByCredentials(email, password);
      user.status = 'online';
      await user.save();
      res.status(200).json(user);
    } catch (e) {
        res.status(400).json(e.message)
    }
  })
  
  
  module.exports = router