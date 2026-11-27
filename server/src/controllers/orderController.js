import Cart from "../models/CartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/ProductModels.js";
import { orderCancelledTemplate, orderInvoiceTemplate } from "../utils/emailTemplates.js";
import { sendEmail } from "../utils/sendEmail.js";


export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod = "COD" } = req.body;
        const userId = req.user._id;

        //shipping address validation
        const requiredFields = ['fullName', 'phone', 'streetAddress', 'city', 'postalCode'];
        const hasAllFields = shippingAddress && requiredFields.every(field => shippingAddress[field]);

        if (!hasAllFields) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required shipping details.",
            });
        }

        // User Cart Fetch
        const cart = await Cart.findOne({
            userId: userId
        }).populate('products.productId');

        if (!cart || cart.products.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Your cart is empty. Please add products to your cart before placing an order.",
            });
        }


        //stock check
        const orderItems = []
        let itemsPrice = 0;
        const errors = [];

        for (const item of cart.products) {
            const product = item.productId;

            if (!product) {
                errors.push(`Product with ID ${item.productId} not found.`);
                continue;
            }
            if (product.stock < item.quantity) {
                errors.push(`Insufficient stock for product: ${product.title}. Available: ${product.stock}, Requested: ${item.quantity}`);
                continue;
            }

            //has discount or not
            const hasDiscount = product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price;

            const price = hasDiscount ? product.discountPrice : product.price;

            const primaryImage = product.images.find(img => img.isPrimary)?.url
                || product.images[0]?.url || '';

            orderItems.push({
                productId: product._id,
                title: product.title,
                quantity: item.quantity,
                price: price,
                selectedSize: item.selectedSize || '',
                image: primaryImage,
            });

            itemsPrice += price * item.quantity;

        }

        if (errors.length > 0) {
            return res.status(400).json({
                success: false,
                message: errors[0],
                errors
            });
        }

        //shipping fee and total amount calculation
        const shippingFee = itemsPrice > 5000 ? 0 : 250;
        const totalAmount = itemsPrice + shippingFee;


        //save order and update stock
        const order = await Order.create({
            user: userId,
            products: orderItems,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            shippingFee,
            totalAmount
        });

        for (const item of cart.products) {
            await Product.findByIdAndUpdate(item.productId._id, {
                $inc: { stock: -item.quantity }
            });
        }

        cart.products = [];
        await cart.save();

        if (req.user?.email) {
            const shortId = order._id.toString().slice(-8).toUpperCase();
            sendEmail({
                email: req.user.email,
                subject: `Order Confirmed & Invoice #${shortId} — AK'S STORE`,
                message: orderInvoiceTemplate(req.user, order),
            }).catch(err => console.error("Order Invoice Email Failed:", err.message));
        }

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: order,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to place order.",
            error: error.message,
        });
    }
}


export const getMyOrders = async (req, res) => {
    try {
        const userId = req.user._id;
        const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders: orders,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch orders.",
            error: error.message,
        });
    }
}

export const getOrderById = async (req, res) => {
    try {
        const orderId = req.params.id;
        const userId = req.user._id;
        const order = await Order.findOne({ _id: orderId, user: userId });

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        res.status(200).json({
            success: true,
            order: order,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch order.",
            error: error.message,
        });
    }
}

export const getAllOrders = async (req, res) => {
    try {
        const { status } = req.query;
        const filter = status && status !== 'All' ? { orderStatus: status } : {};
        const orders = await Order.find(filter)
            .populate('user', 'fullname email')
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            orders: orders,
            count: orders.length,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to fetch all orders.",
            error: error.message,
        });
    }
}

export const updateOrder = async (req, res) => {
    try {
        const orderStatus = req.body.orderStatus || req.body.status;
        const { paymentStatus } = req.body;
        const order = await Order.findById(req.params.id).populate('user', 'name fullname email');

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        const currentStatus = order.orderStatus ? order.orderStatus.toLowerCase() : '';

        if (currentStatus === "delivered" || currentStatus === "cancelled") {
            return res.status(400).json({
                success: false,
                message: `Order is already '${order.orderStatus}' and cannot be modified further.`,
            });
        }

        let statusChanged = false

        if (orderStatus) {
            statusChanged = true
            const newStatusLower = orderStatus.toLowerCase();
            order.orderStatus = orderStatus;

            if (newStatusLower === "cancelled" && currentStatus !== "cancelled") {
                const itemsList = order.orderItems || order.products || [];

                for (const item of itemsList) {
                    const productId = item.productId?._id || item.productId;
                    const restockQty = Number(item.quantity || item.qty || 1);
                    if (productId) {
                        await Product.findByIdAndUpdate(productId, {
                            $inc: { stock: restockQty }
                        });
                    }
                }
                order.paymentStatus = "Failed";
            }
            if (newStatusLower === "delivered") {
                order.paymentStatus = "Paid";
            }
        }

        const activeStatusLower = order.orderStatus.toLowerCase();
        if (paymentStatus && activeStatusLower !== "cancelled" && activeStatusLower !== "delivered") {
            order.paymentStatus = paymentStatus;
        }

        const updatedOrder = await order.save();

        const recipientEmail = order.user?.email;
        const recipientName = order.user?.name || order.user?.fullname || order.shippingAddress?.fullName;

        if (statusChanged && recipientEmail) {
            const shortId = updatedOrder._id.toString().slice(-8).toUpperCase();
            const newStatusLower = updatedOrder.orderStatus.toLowerCase();

            if (newStatusLower === "cancelled") {
                sendEmail({
                    email: recipientEmail,
                    subject: `Order Cancelled #${shortId} — AK'S STORE`,
                    message: orderCancelledTemplate(recipientName, updatedOrder, 'admin'),
                }).catch(err => console.error("Admin Cancel Email Failed:", err.message));
            } else if (["shipped", "delivered"].includes(newStatusLower)) {
                sendEmail({
                    email: recipientEmail,
                    subject: `Order #${shortId} is ${updatedOrder.orderStatus} — AK'S STORE`,
                    message: orderStatusTemplate(recipientName, updatedOrder, updatedOrder.orderStatus),
                }).catch(err => console.error("Order Status Email Failed:", err.message));
            }
        }

        res.status(200).json({
            success: true,
            message: `Order status updated to '${updatedOrder.orderStatus}'.`,
            order: updatedOrder,
        });

    } catch (error) {
        console.log('Error updating order:', error);
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to update order.",
            error: error.message,
        });
    }
}

export const cancelMyOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id, user: req.user._id })

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        const currentStatus = (order.orderStatus || 'pending').toLowerCase()

        const cancellableStatuses = ['pending', 'processing']

        if (!cancellableStatuses.includes(currentStatus)) {
            return res.status(400).json({
                success: false,
                message: `Order cannot be cancelled once it is '${order.orderStatus}'.`,
            });
        }

        const itemsList = order.products || [];
        for (const item of itemsList) {
            const productId = item.productId?._id || item.productId;
            const restockQty = Number(item.quantity || 1);
            if (productId) {
                await Product.findByIdAndUpdate(productId, {
                    $inc: { stock: restockQty }
                });
            }
        }

        order.orderStatus = "Cancelled";
        order.paymentStatus = "Failed";
        const cancelledOrder = await order.save();

        if (req.user?.email) {
            const shortId = order._id.toString().slice(-8).toUpperCase();
            sendEmail({
                email: req.user.email,
                subject: `Order Cancelled #${shortId} — AK'S STORE`,
                message: orderCancelledTemplate(req.user.name, cancelledOrder, 'customer'),
            }).catch(err => console.error("Cancel Email Failed:", err.message));
        }

        res.status(200).json({
            success: true,
            message: "Order cancelled successfully.",
            order: cancelledOrder,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to cancel order.",
            error: error.message,
        });
    }
}
