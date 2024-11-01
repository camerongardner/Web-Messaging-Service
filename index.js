// index.js

// Purpose: Initializes the Express server, connects to the database, sets up middleware and routes, and starts listening for requests.

// Flow:

// Loads environment variables.
// Connects to MongoDB.
// Sets up JSON parsing middleware.
// Defines a simple home route.
// Imports and uses authentication and messaging routes.
// Starts the server on the specified port.

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./db');
const path = require('path');
const cookieParser = require('cookie-parser'); // Add this line

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); // Use cookie-parser

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Middleware to make the token available in all views
app.use((req, res, next) => {
    res.locals.token = req.cookies.token || null;
    next();
});

// Home page
app.get('/', (req, res) => {
    res.render('home');
});

// **Add Frontend Routes Here**
// GET /register - Render the registration page
app.get('/register', (req, res) => {
    res.render('register');
});

// GET /login - Render the login page
app.get('/login', (req, res) => {
    res.render('login');
});

// Import Models and Middleware
const Message = require('./models/Message');
const User = require('./models/User');
const isAuth = require('./middleware/isAuth');

// GET /inbox - Render the registration page
app.get('/inbox', isAuth, async (req, res) => {
    try {
        // Fetch messages where the authenticated user is the receiver
        const messages = await Message.find({ receiver: req.user.userId })
            .populate('sender', 'username') // Populate sender's username
            .sort({ timestamp: -1 }); // Sort by newest first

        console.log('Fetched Messages:', messages); // Debugging

        // Render the inbox.ejs template with messages
        res.render('inbox', { messages });
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).render('inbox', { messages: [], error: 'Failed to load inbox.' });
    }
});

// GET /send - Render the message send page
app.get('/send', (reg, res) => {
    res.render('send');
})

// Import Routes
const authRoutes = require('./routes/auth');
// const messageRoutes = require('./routes/messages');
const apiMessagesRoutes = require('./routes/apiMessages'); // API routes
const frontendMessagesRoutes = require('./routes/frontendMessages'); // Frontend routes

// Route Middlewares
app.use('/auth', authRoutes);
// Mount API Routes under /api/messages
app.use('/api/messages', apiMessagesRoutes);

// Mount Frontend Routes under /messages
app.use('/messages', frontendMessagesRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
