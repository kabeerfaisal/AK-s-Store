import { createContext, useEffect, useMemo, useState } from "react";
import { addToCart, getCart, removeCart, removeProduct, updateCartQuantity } from "../services/cartServices";
import { useAuth } from "./AuthHook";


export let CartContext = createContext()


// let [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("cartData")
//     return savedCart ? JSON.parse(savedCart) : []
// })

// useEffect(() => {
//     localStorage.setItem("cartData", JSON.stringify(cart))
// }, [cart])

// function addToCart(data) {
//     let { _id, title, price, discountPrice, images, category, selectedSize = 'Standard', quantity = 1 } = data
//     const finalPrice = discountPrice && discountPrice > 0 && discountPrice < price ? discountPrice : price
//     // let cartProduct = { title, price, Image: image, quantity: 1 }
//     setCart((preCart) => {
//         let existIndex = preCart.findIndex((item) => item._id === _id && item.selectedSize === selectedSize)
//         // localStorage.setItem('cartData',JSON.stringify(cart))
//         if (existIndex > -1) {
//             return preCart.map((item, index) => {
//                 return index === existIndex ? { ...item, quantity: item.quantity + quantity } : item
//             })
//         } else {
//             return [...preCart, { _id, title, price: finalPrice, originalPrice: price, images: images || [], quantity, category, selectedSize }]
//         }
//     })
//     console.log(cart)
// }


// const cartSubtotal = useMemo(() => {
//     // 1. The Work Block
//     console.log("Calculating total..."); // This will ONLY log when items actually change!
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
// }, [cart]);


// function removeProduct(id, size = 'Standard') {
//     setCart((preData) => preData.filter((item) => !(item._id === id && item.selectedSize === size)))
// }

// function cartIncrement(id, size = 'Standard') {
//     setCart((prevCart) =>
//         prevCart.map((item) =>
//             item._id === id && item.selectedSize === size
//                 ? { ...item, quantity: item.quantity + 1 }
//                 : item
//         )
//     );
// }

// function cartDecrement(id, size = 'Standard') {
//     setCart((preData) => {
//         let existData = preData.find((item) => item._id === id && item.selectedSize === size)
//         if (!existData) return preData;
//         if (existData.quantity <= 1) {
//             return preData.filter((item) => !(item._id === id && item.selectedSize === size))
//         }
//         return preData.map((item) => {
//             return item._id === id && item.selectedSize === size ? { ...item, quantity: item.quantity - 1 } : item
//         })

//     })
// }
        // addToCart, cartIncrement, cart, cartSubtotal, removeProduct, setCart, cartDecrement 


export function CartProvider({ children }) {

    let [cart, setCart] = useState([])

    const { isLogin } = useAuth

    async function addTocart(cartData) {
        try {
            let response = await addToCart(cartData)
            if (response.success) {
                // alert("product added to cart")
                setCart(response.cart.products);
            }
        } catch (error) {
            console.log('error:', error)
        }
    }

    async function getCartData() {
        try {
            let response = await getCart()
            if (response.success) {
                setCart(response.cart.products)
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    async function updateCart(updateData) {
        try {
            let response = await updateCartQuantity(updateData)
            if (response.success) {
                // alert("cart has been updated")
                setCart(response.cart.products);
            }
        } catch (error) {
            console.log('error :', error)
        }
    }

    async function removeProductData(removeData) {
        try {
            let response = await removeProduct(removeData)
            console.log(response)
            if (response.success) {
                // alert("cart product has been deleted")
                setCart(response.cart.products);
                // toast
            }

        } catch (e) {
            console.log('error :', e)
        }

    }

    async function removeCartData() {
        try {
           let response = await removeCart()
            if (response.success) {
                // alert("cart has been removed")
                setCart([]);
            }

        } catch (e) {
            console.log('error :', e)
        }

    }

    useEffect(() => {
            getCartData()

    }, [cart])

    const cartSubtotal = useMemo(() => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);

    const cartCount = useMemo(() => {
        return cart.reduce((total, item) => total + item.quantity, 0);
    }, [cart]);



    return <CartContext.Provider value={{ 
        cart, setCart, addTocart, getCartData, updateCart, removeCartData, removeProductData,
        cartCount, cartSubtotal

    }}>
        {children}
    </CartContext.Provider>
}