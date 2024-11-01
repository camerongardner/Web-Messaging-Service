// middleware/isAuth.js

const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.redirect('/login');
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { userId: verified.userId }; // Attach userId to req.user
        console.log('Authenticated userId:', req.user.userId); // Debugging
        next();
    } catch (error) {
        console.error('Invalid token:', error);
        res.clearCookie('token'); // Clear invalid token
        return res.redirect('/login');
    }
};
