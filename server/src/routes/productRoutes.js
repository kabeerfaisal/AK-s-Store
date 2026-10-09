import e from "express";
import { AuthMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getAllProducts } from "../controllers/productControllers.js";

export const productRoutes = e.Router()


productRoutes.get('/', getAllProducts )
productRoutes.post('/admin/post', AuthMiddleware, isAdmin, createProduct )
productRoutes.post('/admin/delete/:id', AuthMiddleware, isAdmin, deleteProduct )