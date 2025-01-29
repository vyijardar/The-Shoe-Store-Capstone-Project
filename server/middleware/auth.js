const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
    // Assuming the JWT token is sent in the Authorization header
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret here
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Permission denied. Admins only.' });
        }
        req.user = decoded; // Attach user data to the request
        next(); // Proceed to the next middleware/route handler
    } catch (err) {
        console.error(err.message);
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = { checkAdmin };