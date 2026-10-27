import e from "express";
import { AuthMiddleware } from "../middleware/authMiddleware.js";
import { addToCart, getCart, removeCart, removeProduct, updateCartQuantity } from "../controllers/cartController.js";

export const cartRoutes = e.Router()

cartRoutes.get('/', AuthMiddleware, getCart)

cartRoutes.post('/add-cart', AuthMiddleware, addToCart)

cartRoutes.patch('/update-cart', AuthMiddleware, updateCartQuantity)

cartRoutes.delete('/remove-product', AuthMiddleware, removeProduct)

cartRoutes.delete('/remove-cart', AuthMiddleware, removeCart)


