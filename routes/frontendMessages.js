// routes/frontendMessages.js

const express = require('express');
const isAuth = require('../middleware/isAuth'); // Frontend authentication middleware
const Message = require('../models/Message');
const User = require('../models/User');
const router = express.Router();

// Frontend Route: Render Inbox Page
router.get('/inbox', isAuth, async (req, res) => {
  try {
    const messages = await Message.find({ receiver: req.user.userId })
      .populate('sender', 'username')
      .sort({ timestamp: -1 });

    console.log('Fetched Messages:', messages); // Debugging

    res.render('inbox', { messages });
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).render('inbox', { messages: [], error: 'Failed to load inbox.' });
  }
});

// Frontend Route: Render Send Message Page
router.get('/send', isAuth, (req, res) => {
  res.render('send');
});

// Frontend Route: Handle Send Message Form Submission
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
