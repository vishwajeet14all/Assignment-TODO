const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const { db } = require('../database')
const dotenv = require('dotenv')
dotenv.config()

// Secret key for JWT
const SECRET_KEY = "your-secret-key"

// Register endpoint
exports.register = (async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log(email, password, 'email,password')
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save the user in the database
        const insertQuery = 'INSERT INTO users (email, password) VALUES (?, ?)';
        db.query(insertQuery, [email, hashedPassword], (error, results) => {
            if (error) {
                console.error('Error during registration:', error);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }
            const options = {
                httpOnly: true,
                expires: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000)
            }
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            res.cookie("authToken", token, options);
            res.status(201).json({ message: 'Registration successful' });
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login endpoint
exports.login = (async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user in the database
        const selectQuery = 'SELECT * FROM users WHERE email = ?';
        db.query(selectQuery, [email], async (error, results) => {
            if (error) {
                console.error('Error during login:', error);
                res.status(500).json({ message: 'Internal server error' });
                return;
            }

            if (results.length === 0 || !(await bcrypt.compare(password, results[0].password))) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            results = results[0]
            // Generate a JWT token
            const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' });
            // Store the token in a cookie

            res.cookie('authToken', token, { httpOnly: true });
            res.json({ token, results });
        });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});


// Logout endpoint
exports.logout = (req, res) => {
    // Clear the token cookie
    res.clearCookie('authToken');
    res.json({ message: 'Logout successful' });
};

// Protected route example
// app.get('/protected', (req, res) => {
//     // Middleware to check for the presence of a valid token
//     const token = req.header('Authorization');
//     if (!token) {
//         return res.status(401).json({ message: 'Unauthorized' });
//     }

//     jwt.verify(token, SECRET_KEY, (err, user) => {
//         if (err) {
//             return res.status(403).json({ message: 'Invalid token' });
//         }
//         res.json({ message: 'Welcome to the protected route', user });
//     });
// });

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`);
// });
