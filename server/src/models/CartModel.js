import mongoose from "mongoose";


const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        unique: true,
        required: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },

            price: {
                type: Number,
                required: true,
                min: 0,
            },
            quantity: {
                type: Number,
                required: true,
                min: 1,
                default: 1,
            },
            selectedSize: {
                type: String,
                default: "",
            }
        },
    ],
})

const Cart = mongoose.model('Cart', cartSchema)

export default Cart