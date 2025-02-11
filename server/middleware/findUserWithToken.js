const jwt = require('jsonwebtoken');
const { client } = require('../db');
const JWT= process.env.JWT_SECRET || 'your_jwt_secret' // Store in .env for security

const findUserWithToken = async (token) => {
    try {
        // Verify and decode token
        const payload = jwt.verify(token, JWT);
     
        const userId = payload.id;

        // Query the database to find the user
        const SQL = `SELECT id, email, role FROM users WHERE id = $1;`;
        const response = await client.query(SQL, [userId]);

        if (response.rows.length === 0) {
            throw new Error('Unauthorized: User not found');
        }

        return response.rows[0]; 
    } catch (error) {
        console.error('Error in findUserWithToken:', error);
        error.status = 401; 
        throw error;
    }
};

module.exports = findUserWithToken;
