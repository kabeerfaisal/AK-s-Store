import React, { useEffect, useState } from 'react'
import { getProductsByFilter } from '../services/Admin_Services/AdminProductServices'

function GetProductsByFilter({ category = 'all', initialSort = 'featured', initialPage = 1 } = {}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sortBy, setSortBy] = useState(initialSort)
    const [page, setPage] = useState(initialPage)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)


    const fetchProductsData = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await getProductsByFilter(category,{
                sort: sortBy,
                page,
                limit: 10
            })

            if (response.success) {
                setProducts(response.products || response.product || []);
                setTotalPages(response.totalPages || 1);
                setTotalProducts(response.totalProducts || 0);
            }else{
                setError('Failed to fetch products');
            }
        } catch (error) {
            setError(error.message || 'Something went wrong while fetching products');
        }finally{
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchProductsData()
    }, [category, sortBy, page])

    return {
        products, loading, error, 
        sortBy, setSortBy, page,
        setPage, totalPages, totalProducts,
        refetch: fetchProductsData
    }
}

export default GetProductsByFilter