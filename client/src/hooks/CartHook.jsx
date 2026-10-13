import { createContext, useEffect, useMemo, useState } from "react";


export let CartContext = createContext()


export function CartProvider({ children }) {
    let [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem("cartData")
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(() => {
        localStorage.setItem("cartData", JSON.stringify(cart))
    }, [cart])

    function addToCart(data) {
        let { _id, title, price, discountPrice, images, category, selectedSize = 'Standard', quantity = 1 } = data
        const finalPrice = discountPrice && discountPrice > 0 && discountPrice < price ? discountPrice : price
        // let cartProduct = { title, price, Image: image, quantity: 1 }
        setCart((preCart) => {
            let existIndex = preCart.findIndex((item) => item._id === _id && item.selectedSize === selectedSize)
            // localStorage.setItem('cartData',JSON.stringify(cart))
            if (existIndex > -1) {
                return preCart.map((item, index) => {
                    return index === existIndex ? { ...item, quantity: item.quantity + quantity } : item
                })
            } else {
                return [...preCart, { _id, title, price: finalPrice, originalPrice: price, images: images || [], quantity, category, selectedSize }]
            }
        })
        console.log(cart)
    }


    const cartSubtotal = useMemo(() => {
        // 1. The Work Block
        console.log("Calculating total..."); // This will ONLY log when items actually change!
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);


    function removeProduct(id, size = 'Standard') {
        setCart((preData) => preData.filter((item) => !(item._id === id && item.selectedSize === size)))
    }

    function cartIncrement(id, size = 'Standard') {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item._id === id && item.selectedSize === size
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    }

    function cartDecrement(id, size = 'Standard') {
        setCart((preData) => {
            let existData = preData.find((item) => item._id === id && item.selectedSize === size)
            if (!existData) return preData;
            if (existData.quantity <= 1) {
                return preData.filter((item) => !(item._id === id && item.selectedSize === size))
            }
            return preData.map((item) => {
                return item._id === id && item.selectedSize === size ? { ...item, quantity: item.quantity - 1 } : item
            })

        })
    }
    return <CartContext.Provider value={{ addToCart, cartIncrement, cart, cartSubtotal, removeProduct, setCart, cartDecrement }}>
        {children}
    </CartContext.Provider>
}