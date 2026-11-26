import express from "express"
import { cancelMyOrder, createOrder, getAllOrders, getMyOrders, getOrderById, updateOrder } from "../controllers/orderController.js";
import { AuthMiddleware, isAdmin } from "../middleware/authMiddleware.js";


const orderRoutes = express.Router();

orderRoutes.post ("/create", AuthMiddleware, createOrder)
orderRoutes.get ("/", AuthMiddleware, getMyOrders)
orderRoutes.delete("/:id/cancel", AuthMiddleware, cancelMyOrder)

//admin routes
orderRoutes.get ("/all", AuthMiddleware, isAdmin, getAllOrders)
orderRoutes.put ("/:id/status", AuthMiddleware, isAdmin, updateOrder)

orderRoutes.get ("/:id", AuthMiddleware, getOrderById)


export default orderRoutes