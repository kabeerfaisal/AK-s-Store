import axios from "axios";
import { createContext, useEffect, useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export let ApiContext = createContext()



export function APiProvider({ children }) {
    let [products, setProducts] = useState([])
    let [loading, setLoading] = useState(false)
    let [error, setError] = useState('')

    let getData = async () => {
        try {
            setLoading(true)
            let fetchProduct = await axios.get(`${API_BASE_URL}/products`)
            setProducts(fetchProduct.data)
            // console.log(fetchProduct.data)
        } catch (error) {
            console.log(`error: ${error}`)
            setError("Network issue detected. Please check your connection and try again.");
        } finally {
            setLoading(false)
        }

    }
    useEffect(()=>{
        getData()
    },[])

    return <ApiContext.Provider value={{getData,loading,products,error}}>
        {children}
    </ApiContext.Provider>
}