// models/User.js

// Purpose: Define the data structure for users using Mongoose schemas.

// Fields:

// username: Unique identifier for the user.
// password: Hashed password.

const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
module.exports = mongoose.model('User', UserSchema);