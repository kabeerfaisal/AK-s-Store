import e from "express";
import { AuthMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getProductById, getProductsByFilters, updateProduct } from "../controllers/productControllers.js";

export const productRoutes = e.Router()


productRoutes.get('/', getProductsByFilters )
productRoutes.get('/:id', getProductById )
productRoutes.get('/category/:id', getProductsByFilters )
productRoutes.post('/admin/post', AuthMiddleware, isAdmin, createProduct ),
productRoutes.post('/admin/update/:id', AuthMiddleware, isAdmin, updateProduct)
productRoutes.post('/admin/delete/:id', AuthMiddleware, isAdmin, deleteProduct )