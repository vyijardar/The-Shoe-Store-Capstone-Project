
const jwt = require('jsonwebtoken');
const JWT= process.env.JWT_SECRET || 'your_jwt_secret'
const findUserWithToken = require('../middleware/findUserWithToken'); 
// Middleware to check if the user is logged in
const isLoggedIn = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log("Received Authorization Header:", req.headers.authorization);  

    if (!token) {
        console.log("No token provided");
        return res.status(401).json({ message: "No token provided" });
    }
     console.log("Token",token);
    // Verify token
    jwt.verify(token, JWT, (err, decoded) => {
        if (err) {
            console.log("Token verification failed:", err); 
            return res.status(401).json({ message: "Invalid or expired token" });
        }

     
        console.log("Decoded Token:", decoded);
        req.user = decoded; 
        next();  // Proceed to the next middleware or route handler
    });
};

// Middleware to check if the user is an admin
const checkAdmin = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]; 

        if (!token) {
            return res.status(401).json({ error: 'Access denied: No token provided' });
        }

        // Find user from token
        const user = await findUserWithToken(token);
        
        if (user.role !== 'admin') {
            console.log('Access denied: User is not an admin');
            return res.status(403).json({ error: 'Access denied: You are not an admin' });
        }

        // Attach user to request object
        req.user = user;
        console.log('Access granted: User is admin');

        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.error('Error in checkAdmin:', error.message);
        res.status(error.status || 500).json({ error: error.message || 'Internal Server Error' });
    }
};
module.exports = {checkAdmin,isLoggedIn};