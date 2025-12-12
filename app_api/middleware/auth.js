const jwt = require('jsonwebtoken');

// JWT secret - must match the one in auth controller
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

/* JWT authentication middleware */
module.exports.authenticate = function(req, res, next) {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'No token provided' 
            });
        }

        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix

        // Verify token
        const decoded = jwt.verify(token, jwtSecret);
        
        // Attach user info to request
        req.user = decoded;
        
        // Continue to next middleware
        next();
    } catch (err) {
        if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Invalid or expired token' 
            });
        }
        
        res.status(500).json({ 
            error: 'Internal server error',
            message: err.message 
        });
    }
};
