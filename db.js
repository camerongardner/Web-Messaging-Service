// db.js

// Purpose: Connects to the MongoDB database using Mongoose.

// How It Works:

// Loads environment variables.
// Connects to MongoDB using the URI from .env.
// Logs success or error messages.

const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;