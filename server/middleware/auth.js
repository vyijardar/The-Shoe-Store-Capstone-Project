
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Received Authorization Header:", req.headers.authorization);  

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }

    // Verify token
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err); 
            return res.status(401).json({ message: "Invalid or expired token" });
        }

        console.log("Token verified successfully:", decoded); 
        req.user = decoded;  // Attach user info (including role) to the request object
        next();  // Proceed to the next middleware or route handler
    });
};

// Middleware to check if the user is an admin
const checkAdmin = (req, res, next) => {
    console.log("User info from token:", req.user);  // Log user info

    if (req.user && req.user.role === 'admin') {
        console.log("Access granted: User is admin");
        return next();  // Proceed to the next middleware or route handler
    } else {
        console.log("Access denied: User is not admin");
        return res.status(403).json({ error: 'Access denied: You are not an admin' });
    }
};

module.exports = {checkAdmin,isLoggedIn};