import express from 'express';
import { googleLogin, loginUser, registerUser } from '../controllers/authControllers.js';


const authRoutes = express.Router();


authRoutes.post('/register', registerUser)
authRoutes.post('/login', loginUser)
authRoutes.post('/google', googleLogin)

export default authRoutes