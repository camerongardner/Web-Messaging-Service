// routes/auth.js

// Purpose: Define API endpoints for authentication functionalities.

// Endpoints:

// POST /auth/register: Registers a new user.
// POST /auth/login: Authenticates a user and returns a JWT.

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
const Joi = require('joi');

// Define validation schemas
const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

// Register Route
router.post('/register', async (req, res) => {
  // Validate input
  const { error } = registerSchema.validate(req.body);
  if (error) return res.status(400).render('register', { error: error.details[0].message });

  const { username, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).render('register', { error: 'Username already taken' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  
  res.redirect('/login');
});

// Login Route
router.post('/login', async (req, res) => {
  // Validate input
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).render('login', { error: error.details[0].message });

  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Set token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true in production
      sameSite: 'strict',
      maxAge: 3600000, // 1 hour
    });

    res.redirect('/inbox');
  } else {
    res.status(401).render('login', { error: 'Invalid credentials' });
  }
});

// Logout Route
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});

module.exports = router;

// Logout Route
router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.redirect('/');
});