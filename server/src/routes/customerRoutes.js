import express from "express";
import { AuthMiddleware, isAdmin } from "../middleware/authMiddleware.js";
import { deleteCustomers, getAllCustomers, getCustomerDetails, updateCustomers } from "../controllers/customerControllers.js";

export const customerRoutes = express.Router()


customerRoutes.get("/", AuthMiddleware, isAdmin, getAllCustomers)
customerRoutes.get("/:id", AuthMiddleware, isAdmin, getCustomerDetails)
customerRoutes.patch("/:id/role", AuthMiddleware, isAdmin, updateCustomers)
customerRoutes.delete("/:id", AuthMiddleware, isAdmin, deleteCustomers)

