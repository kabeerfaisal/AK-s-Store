import mongoose from "mongoose";

const orderProductSchema = mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        title: { type: String, required: true },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        selectedSize: { type: String, default: "" },
        image: { type: String, default: "" },
    }
);

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: [orderProductSchema],
    shippingAddress: {
        fullName: { type: String, required: true },
        phone: { type: String, required: true },
        streetAddress: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
    },
    paymentMethod: {
        type: String,
        enum: ["COD", "Card"],
        required: true
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed"],
        default: "Pending",
    },
    orderStatus: {
        type: String,
        enum: ["Processing", "Shipped", "Delivered", "Cancelled"],
        default: "Processing",
    },
    itemsPrice: { 
        type: Number, 
        required: true 
    },
    shippingFee: { 
        type: Number, 
        required: true, 
        default: 0 
    },
    totalAmount: { 
        type: Number, 
        required: true 
    },
}, {timestamps: true });

const Order = mongoose.model("Order", orderSchema);
export default Order;