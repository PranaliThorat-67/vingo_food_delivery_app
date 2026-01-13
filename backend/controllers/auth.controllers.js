import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';

const signUp = async(req, res) => {
    try {
        const { fullName, email, password, mobileNumber, role } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }
        if (password.length < 6) {
            return res.status(400).json({ message: "Password must be at least 6 characters long" });
        }
        if (mobileNumber.length < 6) {
            return res.status(400).json({ message: "Mobile number must be at least 10 digits long" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            fullName,
            email,
            role,
            password: hashedPassword,
            mobileNumber
        });
        res.status(201).json({ message: "User created successfully", user });
    } catch (error) {
        console.error('Error during sign up:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};