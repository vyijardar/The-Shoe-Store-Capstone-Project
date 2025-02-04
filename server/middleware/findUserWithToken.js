const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

// Ensure JWT_SECRET is loaded
if (!JWT_SECRET) {
  console.error('JWT_SECRET is not set in environment variables.');
  process.exit(1); // Exit if secret is missing
}

const findUserWithToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1];  // Extract token after 'Bearer'

  console.log('Received Authorization Header:', authHeader);  // Debug header

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    // Verify token synchronously
    const payload = jwt.verify(token, JWT_SECRET);
    console.log('Decoded Payload:', payload);  // Check decoded token contents

    // Ensure payload contains expected fields
    if (!payload.userId || !payload.email) {
      return res.status(401).json({ error: 'Invalid token payload' });
    }

    req.user = { id: payload.userId, email: payload.email };  // Attach user info to the request
    next();  // Continue to the next middleware/route handler
  } catch (ex) {
    console.error('JWT Verification failed:', ex);  // Full error for debugging
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = findUserWithToken;
