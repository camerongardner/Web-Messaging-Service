// middleware/auth.js

//Purpose: Protects routes by verifying JWT tokens. It ensures that only authenticated users can access certain endpoints.

// How It Works:

// Extracts the token from the Authorization header.
// Verifies the token using jwt.verify.
// Attaches the decoded user information to req.user.
// Allows the request to proceed if the token is valid; otherwise, sends an error response.

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.header('Authorization');
  const token = authHeader && authHeader.split(' ')[1]; // Expecting format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { userId: verified.userId }; // Attach userId to req.user
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token.' });
  }
};
