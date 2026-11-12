import Order from "../models/orderModel.js";
import Users from "../models/UserModel.js";


export const getAllCustomers = async (req, res) => {
    try {
        const customers = await Users.aggregate([
            {
                $lookup: {
                    from: "orders",
                    localField: "_id",
                    foreignField: "user",
                    as: "customerOrders"
                }
            },
            {
                $project: {
                    name: 1,
                    email: 1,
                    age: 1,
                    role: 1,
                    googleId: 1,
                    isBlocked: 1,
                    createdAt: 1,
                    totalOrders: { $size: "$customerOrders" },
                    totalSpent: { $sum: "$customerOrders.totalAmount" },
                }
            },
            { $sort: { createdAt: -1 } }
        ])

        res.status(200).json({
            success: true,
            customers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch customers",
            error: error.message
        });
    }
}


export const getCustomerDetails = async (req, res) => {
    try {
        const { id } = req.params

        const customer = await Users.findById(id).select("-password -resetPasswordToken")

        if (!customer) {
            return res.status(404).json({
                success: false,
                message: "Customer not found"
            });
        }

        const orders = await Order.find({ user: id }).sort({ createdAt: -1 })

        res.status(200).json({
            success: true,
            customer,
            orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching customer details"
        });
    }
}

export const updateCustomers = async (req, res) => {
    try {
        const { id } = req.params
        const { role } = req.body

        if (req.user._id.toString() === id) {
            return res.status(400).json({ success: false, message: "You cannot change your own admin role." });
        }

        const updatedUser = await Users.findByIdAndUpdate(
            id,
            { role },
            { new: true }
        ).select("-password")

        res.status(200).json({ success: true, message: `Role updated to ${role}`, user: updatedUser });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update role"
        });
    }
}


export const deleteCustomers = async (req, res) => {
    try {
        const { id } = req.params

        if (req.user._id.toString() === id) {
            return res.status(400).json({ success: false, message: "You cannot delete your own account." });
        }

        await Users.findByIdAndDelete(id)

        res.status(200).json({
            success: true,
            message: "Customer deleted successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to delete customer"
        });
    }
}