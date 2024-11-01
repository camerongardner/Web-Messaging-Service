// routes/apiMessages.js

const express = require('express');
const auth = require('../middleware/auth'); // API authentication middleware
const Message = require('../models/Message');
const router = express.Router();

// API Route: Send Message
router.post('/send', auth, async (req, res) => {
  const { receiverId, content } = req.body;

  try {
    const message = new Message({
      sender: req.user.userId,
      receiver: receiverId,
      content,
    });
    await message.save();
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ error: 'Failed to send message.' });
  }
});

// API Route: Get Inbox Messages
router.get('/inbox', auth, async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.userId })
      .populate('sender', 'username')
      .sort({ timestamp: -1 });
    res.status(200).json({ messages });
  } catch (error) {
    console.error('Error fetching inbox messages:', error);
    res.status(500).json({ error: 'Failed to fetch inbox messages.' });
  }
});

module.exports = router;
