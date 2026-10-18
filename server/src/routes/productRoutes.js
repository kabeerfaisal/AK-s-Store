import e from "express";
import { AuthMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getProductsByFilters, updateProduct } from "../controllers/productControllers.js";

export const productRoutes = e.Router()


productRoutes.get('/products', getProductsByFilters )
productRoutes.get('/products/category/:id', getProductsByFilters )
productRoutes.post('/admin/post', AuthMiddleware, isAdmin, createProduct ),
productRoutes.post('/admin/update/:id', AuthMiddleware, isAdmin, updateProduct)
productRoutes.post('/admin/delete/:id', AuthMiddleware, isAdmin, deleteProduct )