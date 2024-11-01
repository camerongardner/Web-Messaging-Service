// models/Message.js

// Purpose: Define the data structure for messages using Mongoose schemas.

// Fields:

// sender: Reference to the User who sends the message.
// receiver: Reference to the User who receives the message.
// content: The message content.
// timestamp: When the message was sent.

const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Message', MessageSchema);