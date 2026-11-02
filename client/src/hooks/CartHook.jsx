import { createContext, useEffect, useMemo, useState } from "react";
import { addToCart, getCart, removeCart, removeProduct, updateCartQuantity } from "../services/cartServices";
import { useAuth } from "./AuthHook";


export let CartContext = createContext()



export function CartProvider({ children }) {

    let [cart, setCart] = useState([])
    let [istoken,setIstoken]=useState(
        (prev)=>{
            let token=localStorage.getItem('token')
            if(!token){
                return false
            }else{
                return true
            }
        }
    )

    async function addTocart(cartData) {
        try {
            let response = await addToCart(cartData)
            if (response.success) {
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
                setCart([]);
            }

        } catch (e) {
            console.log('error :', e)
        }

    }

    useEffect(() => {
        if(istoken){
            getCartData()

        }

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