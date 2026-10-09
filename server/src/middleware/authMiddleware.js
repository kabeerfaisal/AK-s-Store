import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';

export const AuthMiddleware = async (req, res, next) => {
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decode = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await UserModel.findById(decode.id).select('-password')
            if (!req.user) {
                return res.status(401).json({message: "User Not Found or Account"})
            }
            next()
        } catch (error) {
            console.error('Token verification failed:', error.message);
            return res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }
    if (!token) {
    return res.status(401).json({ message: 'Not authorized, no token provided' });
  }
}


export const isAdmin = (req, res, next)=>{
    if (req.user && req.user.role === 'admin') {
        next()
    } else {
        return res.status(403).json({message: 'Access denied. Only for admin'})
    }
}