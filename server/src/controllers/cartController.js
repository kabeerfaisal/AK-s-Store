import Cart from "../models/CartModel.js";
import Product from "../models/ProductModels.js";


export const addToCart = async (req, res) => {
    try {
        let userId = req.user.id

        const { productId, quantity = 1, selectedSize = '' } = req.body

        if (!userId || !productId) {
            return res.status(400).json({
                success: false,
                message: "userId and productId are required"
            })
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1",
            });
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }

        const hasSizeVariants = product.sizes && Array.isArray(product.sizes) && product.sizes.length > 0

        if (hasSizeVariants) {
            if (!selectedSize || selectedSize.trim() === '') {
                return res.status(400).json({
                    success: false,
                    message: `Please select a size. Available sizes: ${product.sizes.join(', ')}`
                });
            }

            if (!product.sizes.includes(selectedSize)) {
                return res.status(400).json({
                    success: false,
                    message: `Invalid size '${selectedSize}'. Available sizes are: ${product.sizes.join(', ')}`
                })
            }

        } else {
            selectedSize = ''
        }

        const hashDiscount = product.discountPrice && product.discountPrice > 0 && product.discountPrice < product.price
        const finalPrice = hashDiscount ? product.discountPrice : product.price

        let cart = await Cart.findOne({ userId })

        if (!cart) {
            cart = new Cart({ userId, products: [] })
        }

        const existProduct = cart.products.find(
            (item) => item.productId.toString() === productId && item.selectedSize === selectedSize
        );

        const currentQtyInCart = existProduct ? existProduct.quantity : 0
        const newTotalQty = currentQtyInCart + quantity

        if (newTotalQty > product.stock) {
            return res.status(400).json({
                success: false,
                message: `Cannot add more. Only ${product.stock} units available in stock.`
            });
        }

        if (existProduct) {
            existProduct.quantity = newTotalQty
            existProduct.price = finalPrice
        } else {
            cart.products.push({
                productId: product._id,
                price: finalPrice,
                quantity,
                selectedSize
            })
        }

        await cart.save()

        await cart.populate('products.productId', 'title images price discountPrice stock category');

        return res.status(200).json({
            success: true,
            message: "Product added to cart",
            cart,
            count: cart.products.reduce(
                (total, item) => total + item.quantity,
                0
            ),
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}


export const removeProduct = async (req, res) => {
    try {
        let userId = req.user.id
        const { productId, selectedSize = "" } = req.body

        if (!productId) {
            return res.status(400).json({
                success: false,
                message: "productId is required to remove an item",
            });
        }

        const cart = await Cart.findOne({ userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }
        cart.products.pull({
            productId: productId,
            selectedSize: selectedSize
        })

        await cart.save()

        await cart.populate('products.productId', 'title images price discountPrice stock category');

        return res.status(200).json({
            success: true,
            message: "Product removed from cart",
            cart,
            count: cart.products.reduce(
                (total, p) => total + p.quantity,
                0
            ),
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const removeCart = async (req, res) => {
    try {
        let userId = req.user.id

        const cart = await Cart.findOneAndDelete({ userId })

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Entire cart removed",
            cart: { userId, products: [] },
            count: 0,
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const updateCartQuantity = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId, quantity, selectedSize = "" } = req.body

        if (!productId || quantity === undefined) {
            return res.status(400).json({
                success: false,
                message: "Products & Quantity are required"
            })
        }

        if (!Number.isInteger(quantity) || quantity < 1) {
            return res.status(400).json({
                success: false,
                message: "Quantity must be at least 1"
            })
        }

        const product = await Product.findById(productId)

        if (!product) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        if (quantity > product.stock) {
            return res.status(400).json({
                success: false,
                message: `Cannot update. Only ${product.stock} units available in stock.`
            })
        }

        const cart = await Cart.findOne({ userId })
        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

         const existProduct = cart.products.find(
            (item) => item.productId.toString() === productId && item.selectedSize === selectedSize
        );

        if(!existProduct){
            return res.status(404).json({
                success: false,
                message: "Product not found in cart"
            });
        }

        existProduct.quantity = quantity

        

        await cart.save();
       
        await cart.populate('products.productId', 'title images price discountPrice stock category');

        const count = cart.products.reduce((total, p) => total + p.quantity, 0);

        return res.status(200).json({
            success: true,
            message: "Cart quantity updated successfully",
            cart,
            count
        });

    } catch (error) {
         console.log(error)
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while updating quantity"
        });
    }
}


export const getCart = async (req, res) => {
    try {
        let userId = req.user.id

        const cart = await Cart.findOne({ userId })
            .populate("products.productId",
            "title images price discountPrice stock category sizes")

        if (!cart) {
            return res.status(200).json({
                success: true,
                cart: { userId, products: [] },
                count: 0,
                message: "cart is Empty"
            })
        }

        const count = cart.products.reduce(
            (total, item) => total + item.quantity,
            0
        )

        const totalPrice = cart.products.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        )

        return res.status(200).json({
            success: true,
            cart,
            count,
            totalPrice
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || "Internal server error while fetching cart"
        });
    }
}

