import express from 'express';
import { forgotPassword, googleLogin, loginUser, registerUser, resetPassword } from '../controllers/authControllers.js';


const authRoutes = express.Router();


authRoutes.post('/register', registerUser)
authRoutes.post('/login', loginUser)
authRoutes.post('/google', googleLogin)
authRoutes.post('/forgot-password', forgotPassword)
authRoutes.post('/reset-password', resetPassword)


export default authRoutes