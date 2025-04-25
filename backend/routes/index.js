const bcrypt = require('bcryptjs');
const express = require('express');
const router = express.Router();
const userModel = require('../models/userModel');

// Home route
router.get('/', function(req, res) {
  res.render('index', { title: 'Code Editor API' });
});

// User sign up
router.post('/signUp', async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  try {
    // Check if user already exists
    const existingUser = await userModel.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        success: false, 
        message: existingUser.email === email 
          ? 'Email already in use' 
          : 'Username already taken' 
      });
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({
      name,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.json({ success: true, message: 'User created successfully!' });

  } catch (error) {
    console.error('Sign up error:', error);
    res.status(500).json({ success: false, message: 'Error creating user' });
  }
});

module.exports = router;