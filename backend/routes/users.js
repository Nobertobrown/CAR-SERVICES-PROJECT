import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.js'; // Ensure the file extension is included

const router = express.Router();

// Handle user registration
router.post('/signup', async (req, res) => {
    const { name, phone, email, location, userType, password } = req.body;

    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user
        const newUser = new User({
            name,
            phone,
            email,
            location,
            userType,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;
