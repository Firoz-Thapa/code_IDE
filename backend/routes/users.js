const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');
const mongoose = require('mongoose');

// Test route to check if the router is working
router.get('/test', (req, res) => {
  res.json({ message: 'User router is working!' });
});

// User login
router.post('/login', async (req, res) => {
  console.log('Login request received:', req.body);
  const { email, password } = req.body;
  
  if (!email || !password) {
    console.log('Missing email or password');
    return res.status(400).json({ success: false, message: "Email and password are required" });
  }

  try {
    console.log('Finding user with email:', email);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    console.log('Comparing passwords');
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.log('Invalid password');
      return res.status(401).json({ success: false, message: "Invalid password" });
    }
    
    // Create JWT token with a secret key
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });
    
    console.log('Login successful for user:', user._id);
    return res.status(200).json({ 
      success: true, 
      token, 
      userId: user._id,
      message: "Login successful" 
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ success: false, message: "Error logging in" });
  }
});

// Get User Details
router.post('/getUserDetails', async (req, res) => {
  console.log("getUserDetails request received:", req.body);
  
  const { userId } = req.body;

  if (!userId) {
    console.log("Missing userId in request");
    return res.status(400).json({ success: false, message: "Missing user ID" });
  }

  // Validate the userId is a valid MongoDB ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    console.log("Invalid userId format:", userId);
    return res.status(400).json({ success: false, message: "Invalid user ID format" });
  }

  try {
    console.log("Finding user with ID:", userId);
    const user = await User.findById(userId);
    
    if (!user) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ success: false, message: "User not found" });
    }
    
    console.log("User found, returning data");
    return res.status(200).json({ 
      success: true, 
      user: {
        _id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt
      } 
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return res.status(500).json({ success: false, message: "Error fetching user details" });
  }
});

// For debugging - get all users (remove in production)
router.get('/check-users', async (req, res) => {
  try {
    const users = await User.find({}).select('-password'); // Exclude passwords
    res.json({ success: true, count: users.length, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ success: false, message: "Error fetching users" });
  }
});

module.exports = router;