import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/GenrateTokens.js";
import axios from "axios";
import { sendEmail } from "../utils/sendEmail.js";
import jwt from 'jsonwebtoken';

export let registerUser = async (req, res) => {
    try {
        const { name, email, password, age } = req.body;
        if (!name || !email || !password || !age) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "User already exists" });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = await UserModel.create({
            name,
            email,
            password: hashedPassword,
            age
        });
        if (!user) {
            return res.status(400).json({ message: "Please Enter Valid Data" });
        }
        res.status(201).json({ message: "User registered successfully", user, token: generateToken(user._id) });
    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log("error", error)
    }
}

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User does not exist" });
        }

        if (!user.password && user.googleId) {
            return res.status(400).json({
                message: "You signed up using Google. Please login with Google"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.status(200).json({ message: "Login successful", user, token: generateToken(user._id) });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


export const googleLogin = async (req, res) => {
    try {
        const { accessToken } = req.body;

        if (!accessToken) {
            return res.status(400).json({ message: "Access token is required" });
        }

        const googleUser = await axios.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        const { name, email, sub: googleId } = await googleUser.data;

        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name,
                email,
                googleId,
            });
        } else if (!user.googleId) {
            user.googleId = googleId;
            await user.save();
        }

        res.status(200).json({
            message: "Google login successful",
            user,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({ message: error.message })
    }
}


export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        const user = await UserModel.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const resetToken = generateToken(user._id.toString(), 'password_reset', '15m')

        user.resetPasswordToken = resetToken;
        await user.save();

        const resetLink = `${process.env.FRNT_END_URL}/reset-password?token=${resetToken}`;

        const emailMessage = `
            <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #FAF8F5; border: 1px solid #E8DFD1; border-radius: 8px;">
                <h2 style="color: #8C1515;">AK'S STORE — Password Reset Request</h2>
                <p>Hello ${user.name},</p>
                <p>You requested to reset or create a password for your AK'S STORE account.</p>
                <p>Click the button below to reset your password:</p>
                <div style="margin: 20px 0;">
                    <a href="${resetLink}" style="background-color: #8C1515; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                        Reset Password
                    </a>
                </div>
                <p style="font-size: 12px; color: #666;">This link will expire in 15 minutes.</p>
            </div>
        `;

        await sendEmail({
            email: user.email,
            subject: "Password Reset Request",
            message: emailMessage
        })

        res.status(200).json({
            success: true,
            message: "Password reset OTP sent to your email address."
        });


    } catch (error) {
        console.error("Forgot Password Error:", error);
        res.status(500).json({ message: "Could not send email. Please try again later." });
    }

}

export const resetPassword = async (req, res) => {
    try {
        const { token, newPassword } = req.body

        if (!token || !newPassword) {
            return res.status(400)
                .json({
                    message: "Token and new password are required."
                });
        }

        if (newPassword.length < 6) {
            return res.status(400)
                .json({
                    message: "Password must be at least 6 characters long."
                });
        }



        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user = await UserModel.findById(decoded.id);

            if (!user || user.resetPasswordToken?.toString().trim() !== token.toString().trim()) {
                return res.status(400).json({ message: "Invalid or expired reset token." });
            }

        } catch (err) {
            console.error("Token verification error:", err);
            return res.status(400).json({ message: "Password reset link is invalid or has expired. Please request a new one." });
        }

        if (decoded.purpose !== 'password_reset') {
            return res.status(400).json({ message: "Invalid reset token." });
        }

        const user = await UserModel.findById(decoded.id);

        if (!user || user.resetPasswordToken !== token) {
            return res.status(400).json({ message: "Invalid or expired reset token." });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetPasswordToken = undefined;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password reset successfully."
        });

    } catch (error) {
        console.error("Reset Password Error:", error);
        res.status(500).json({ message: "Could not reset password. Please try again later." });
    }
}