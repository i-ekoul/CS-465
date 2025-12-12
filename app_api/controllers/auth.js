const User = require('../models/user');
const jwt = require('jsonwebtoken');

// JWT secret - in production, this should be in an environment variable
const jwtSecret = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const jwtExpiry = process.env.JWT_EXPIRY || '1h';

/* POST login */
module.exports.login = async function(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ 
                error: 'Bad request',
                message: 'Email and password are required' 
            });
        }

        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase().trim() }).exec();
        if (!user) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ 
                error: 'Unauthorized',
                message: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user._id,
                email: user.email 
            },
            jwtSecret,
            { expiresIn: jwtExpiry }
        );

        // Return token
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).json({ 
            error: 'Internal server error',
            message: err.message 
        });
    }
};
