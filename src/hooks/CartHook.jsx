import { createContext, useEffect, useMemo, useState } from "react";


export let CartContext = createContext()


export function CartProvider({ children }) {
    let [cart, setCart] = useState(()=>{
        const savedCart = localStorage.getItem("cartData")
        return savedCart ? JSON.parse(savedCart) : []
    })

    useEffect(()=>{
        localStorage.setItem("cartData",JSON.stringify(cart))
    },[cart])

    function addToCart(data) {
        let { title, price, image, id } = data
        // let cartProduct = { title, price, Image: image, quantity: 1 }
        setCart((preData) => {
            let existData = preData.find((item) => item.id == id)
            // localStorage.setItem('cartData',JSON.stringify(cart))
            if (existData) {
                return preData.map((item) => {
                    return item.id === id ? { ...item, quantity: item.quantity + 1 } : item
                })
            } else {
                return [...preData, { id, title, price, Image: image, quantity: 1 }]
            }
        })
        console.log(cart)
    }
    const cartSubtotal = useMemo(() => {
        // 1. The Work Block
        console.log("Calculating total..."); // This will ONLY log when items actually change!
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    }, [cart]);
    function removeProduct(id) {
        setCart((preData)=>preData.filter((item)=>item.id !== id))
    }
    function cartDecrement(id) {
        setCart((preData)=>{
            let existData = preData.find((item)=>item.id == id)
            if (!existData) return preData;
            if (existData.quantity === 1) {
                return preData.filter((item)=>item.id !== id)
            }
            return preData.map((item) => {
                    return item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                })

        })
    }
    return <CartContext.Provider value={{ addToCart, cart, cartSubtotal, removeProduct, setCart, cartDecrement }}>
        {children}
    </CartContext.Provider>
}