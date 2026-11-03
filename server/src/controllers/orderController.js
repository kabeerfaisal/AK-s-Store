import Cart from "../models/CartModel.js";
import Order from "../models/orderModel.js";
import Product from "../models/ProductModels.js";


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

        res.status(201).json({
            success: true,
            message: "Order placed successfully!",
            order: order,
        });

    } catch (error) {
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
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                success: false,
                message: "Order not found.",
            });
        }

        if (orderStatus) {
            order.orderStatus = orderStatus;
        }
        if (paymentStatus) {
            order.paymentStatus = paymentStatus;
        }

        if (
            orderStatus &&
            orderStatus.toLowerCase() === 'delivered' &&
            order.paymentMethod === 'COD'
        ) {
            order.paymentStatus = 'Paid'; 
        }

        const updatedOrder = await order.save();

        res.status(200).json({
            success: true,
            message: `Order status updated to '${updatedOrder.orderStatus}'.`,
            order: updatedOrder,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error: Unable to update order.",
            error: error.message,
        });
    }
}
