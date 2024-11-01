// routes/messages.js

// Purpose: Define API endpoints for messaging functionalities.

// Endpoints:

// POST /messages/send: Sends a message from the authenticated user to another user.
// GET /messages/inbox: Retrieves all messages received by the authenticated user.

const express = require('express');
const auth = require('../middleware/auth'); // API authentication middleware
const isAuth = require('../middleware/isAuth'); // Frontend authentication middleware
const Message = require('../models/Message');
const User = require('../models/User'); // To fetch sender's username
const router = express.Router();

// API Routes

// Send Message via API
router.post('/send', auth, async (req, res) => {
  const { receiverId, content } = req.body;
  const message = new Message({
    sender: req.user.userId,
    receiver: receiverId,
    content,
  });
  await message.save();
  res.json({ message: 'Message sent' });
});

// Get Messages for User via API
router.get('/inbox', auth, async (req, res) => {
  const messages = await Message.find({ receiver: req.user.userId })
    .populate('sender', 'username')
    .sort({ timestamp: -1 });
  res.json(messages);
});

// Frontend Routes

// Render Inbox Page
router.get('/inbox', isAuth, async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.userId })
      .populate('sender', 'username')
      .sort({ timestamp: -1 });
    
    // Debugging: Log fetched messages
    console.log('Fetched Messages:', messages);

    res.render('inbox', { messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).render('inbox', { messages: [], error: 'Failed to load inbox.' });
  }
});

// Render Send Message Page
router.get('/send', isAuth, (req, res) => {
  res.render('send');
});

// Handle Send Message Form Submission
router.post('/send', isAuth, async (req, res) => {
  const { receiver, content } = req.body;

  try {
    // Find receiver by username
    const receiverUser = await User.findOne({ username: receiver });
    if (!receiverUser) {
      return res.status(404).render('send', { error: 'Receiver not found' });
    }

    // Create and save the message
    const message = new Message({
      sender: req.user.userId,
      receiver: receiverUser._id,
      content,
    });
    await message.save();

    res.render('send', { success: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).render('send', { error: 'An error occurred while sending the message' });
  }
});

module.exports = router;