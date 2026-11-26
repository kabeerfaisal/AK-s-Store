import api from "../../Config/ApiConfig";


export async function addProduct(formData) {
    let response = await api.post('/products/admin/post', formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export async function getProductsById(id) {
    let response = await api.get(`/products/${id}`)
    return response.data
}

export async function getProductsByFilter(categoryId, params = {}) {
    
    // Explicitly include category in query params
    const queryParams = {
        ...params,
        category: categoryId || 'all'
    };

    const url = `/products/category/${categoryId}`;
    
    let response = await api.get(url, { params: queryParams });
    return response.data;
}

export async function updateProduct(id, formData) {
    let response = await api.put(`/products/admin/update/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return response.data
}

export async function deleteProduct(id) {
    let response = await api.delete(`/admin/delete/${id}`)
    return response.data
}