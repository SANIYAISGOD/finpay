// /api/auth.js
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { authenticateToken } = require('../utils/middleware');

const secretKey = 'your_secret_key';

module.exports = (req, res) => {
    if (req.method === 'POST' && req.url === '/auth/register') {
        try {
            const { username, password, role } = req.body;

            // Check if user exists
            const existingUser = await User.findOne({ username });
            if (existingUser) {
                return res.status(400).json({ message: 'Username already exists' });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create new user
            const user = new User({
                username,
                password: hashedPassword,
                role: role || 'user'
            });

            await user.save();
            res.status(201).json({ message: 'User created successfully' });
        } catch (error) {
            res.status(500).json({ message: 'Error creating user' });
        }
    } else if (req.method === 'POST' && req.url === '/auth/login') {
        try {
            const { username, password } = req.body;

            // Find user
            const user = await User.findOne({ username });
            if (!user) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Verify password
            const isValid = await bcrypt.compare(password, user.password);
            if (!isValid) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate token
            const token = jwt.sign(
                { id: user._id, username: user.username, role: user.role },
                secretKey,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user._id,
                    username: user.username,
                    role: user.role
                }
            });
        } catch (error) {
            res.status(500).json({ message: 'Login error' });
        }
    } else {
        res.status(404).json({ message: 'Route not found' });
    }
};
