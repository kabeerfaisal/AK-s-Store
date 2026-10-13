import { createContext, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartHook";
import { getProducts } from "../services/Admin_Services/AdminProductServices";


export let GetProductContext = createContext()


export function GetProductProvider({ children }) {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [error, setError] = useState("")

    const fetchProducts = async () => {
        try {
            setLoading(true)
            let response = await getProducts()
            if (response.success) {
                setProducts(response.products)
                console.log(response)
            }
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchProducts()
    }, [])

return <GetProductContext.Provider value={{ loading, products, error, fetchProducts, setProducts }}>
    {children}
</GetProductContext.Provider>
}

export const useGetProduct = () => useContext(GetProductContext)