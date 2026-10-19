import React, { useEffect, useState } from 'react'
import { getProductsByFilter } from '../services/Admin_Services/AdminProductServices'

function GetProductsByFilter({ category = 'All', initialSort = 'featured', initialPage = 1, search = '', includeInactive = false } = {}) {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')
    const [sortBy, setSortBy] = useState(initialSort)
    const [page, setPage] = useState(initialPage)
    const [totalPages, setTotalPages] = useState(1)
    const [totalProducts, setTotalProducts] = useState(0)
    const [searchTerm, setSearchTerm] = useState(search);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    const fetchProductsData = async () => {
        try {
            setLoading(true)
            setError('')

            const response = await getProductsByFilter(category,{
                sort: sortBy,
                page,
                limit: 10,
                search : debouncedSearch || '',
                includeInactive
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

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm);
            setPage(1); // Search change hone par page reset
        }, 400);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    useEffect(()=>{
        fetchProductsData()
    }, [category, sortBy, page, debouncedSearch, includeInactive])

    return {
        products, loading, error, 
        sortBy, setSortBy, page,
        searchTerm, setSearchTerm,
        setPage, totalPages, totalProducts,
        refetch: fetchProductsData
    }
}

export default GetProductsByFilter