import express from "express"
import { createOrder, getMyOrders, getOrderById } from "../controllers/orderController.js";
import { AuthMiddleware } from "../middleware/authMiddleware.js";


const orderRoutes = express.Router();

orderRoutes.post ("/create", AuthMiddleware, createOrder)
orderRoutes.get ("/", AuthMiddleware, getMyOrders)
orderRoutes.get ("/:id", AuthMiddleware, getOrderById)

export default orderRoutes