const mongoose = require('mongoose');
const User = require('../models/Users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Define default credentials
const DEFAULT_ADMIN = {
    email: 'admin@x.com',
    password: 'admin123', // In production, use env vars and hash
    role: 'admin'
};

const DEFAULT_CUSTOMER = {
    email: 'customer@example.com',
    password: 'customer123',
    role: 'customer'
};

const userLogin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required' });
    }

    // Check for default admin credentials
    if (email === DEFAULT_ADMIN.email && password === DEFAULT_ADMIN.password) {
        const token = jwt.sign({ id: 'admin', role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: 'admin',
                username: 'Admin',
                email: DEFAULT_ADMIN.email,
                role: 'admin',
            },
        });
    }

    // Check for default customer credentials
    if (email === DEFAULT_CUSTOMER.email && password === DEFAULT_CUSTOMER.password) {
        const token = jwt.sign({ id: 'customer', role: 'customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: 'customer',
                username: 'Customer',
                email: DEFAULT_CUSTOMER.email,
                role: 'customer',
            },  
        });
    }

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Use role from DB user
        const token = jwt.sign({ id: user._id, role: user.role || 'customer' }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                role: user.role || 'customer',
            },
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = userLogin;