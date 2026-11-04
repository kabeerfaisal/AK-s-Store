import UserModel from "../models/UserModel.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/GenrateTokens.js";
import axios from "axios";

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
