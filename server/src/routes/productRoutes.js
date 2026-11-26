import e from "express";
import { AuthMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getProductById, getProductsByFilters, updateProduct } from "../controllers/productControllers.js";
import { uploadProductImages } from "../middleware/uploadMiddleware.js";

export const productRoutes = e.Router()


productRoutes.get('/', getProductsByFilters )
productRoutes.get('/:id', getProductById )
productRoutes.get('/category/:id', getProductsByFilters )
productRoutes.post('/admin/post', AuthMiddleware, isAdmin, uploadProductImages.array("images", 5), createProduct ),
productRoutes.put('/admin/update/:id', AuthMiddleware, isAdmin, uploadProductImages.array("images", 5),  updateProduct)
productRoutes.delete('/admin/delete/:id', AuthMiddleware, isAdmin, deleteProduct )