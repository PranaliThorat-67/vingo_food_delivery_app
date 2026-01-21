import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import generateToken from './../utils/token.js';
import { sendOtpEmail } from '../utils/mail.js';

export const signUp = async(req, res) => {
    try {
        const { fullName, email, role, mobileNumber, password } = req.body;
        let user = await User.findOne({ email });
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
            mobileNumber,
            password: hashedPassword,
        });

        const token = await generateToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
        })

        return res.status(201).json({
            message: "User created successfully",
            user
        })

    } catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }


};

export const signIn = async(req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = await generateToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
        })

        return res.status(200).json({ user });

    } catch (error) {
        return res.status(500).json({ message: `Sign In error ${error} ` });
    }
};

export const signOut = async(req, res) => {
    try {

        res.clearCookie("token");
        return res.status(200).json({ message: "Sign out successful" });

    } catch (error) {
        return res.status(500).json({ message: `Sign out error ${error.message}` });
    }
};

export const sendOtp = async(req, res) => {
    try {
        const { email } = req.body;
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        console.log("Generated OTP:", otp);
        user.resetOtp = otp;
        user.otpExpiry = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
        user.isOtpVerified = false;
        await user.save();
        // Send OTP to user's email
        await sendOtpEmail(email, otp);
        return res.status(200).json({ message: "OTP sent to email", otp });
    } catch (error) {
        return res.status(500).json({ message: `Error sending OTP: ${error.message}` });
    }
}

export const verifyOtp = async(req, res) => {
    try {
        const { email, otp } = req.body;
        const user = await User.findOne({ email });
        if (!user || user.resetOtp !== otp || user.otpExpiry < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }
        user.isOtpVerified = true;
        user.resetOtp = null;
        user.otpExpiry = null;
        await user.save();
        return res.status(200).json({ message: "OTP verified successfully" });
    } catch (error) {
        res.status(500).json({ message: `Error verifying OTP: ${error.message}` });
    }
}

export const resetPassword = async(req, res) => {
    try {
        const { email, newPassword } = req.body;
        const user = await User.findOne({ email });
        if (!user || !user.isOtpVerified) {
            return res.status(400).json({ message: "OTP not verified" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.isOtpVerified = false;
        await user.save();
        return res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        res.status(500).json({ message: `Error resetting password: ${error.message}` });
    }
}

export const googleAuth = async(req, res) => {
    try {
        const { email, fullName, mobileNumber, role } = req.body;
        let user = await User.findOne({ email });
        if (!user) {
            user = await User.create({
                fullName,
                email,
                mobileNumber,
                role,
            })
        }

        const token = await generateToken(user._id);
        res.cookie("token", token, {
            secure: false,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,
        })

        return res.status(201).json({
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.error('Error during Google auth:', error);
        return res.status(500).json(`googleAuth error: ${error.message}`);
    }
};