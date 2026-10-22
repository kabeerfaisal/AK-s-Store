import api from "../../Config/ApiConfig";


export async function addProduct(data) {
    let response = await api.post('/admin/post', data)
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

export async function updateProduct(id, data) {
    let response = await api.post(`/admin/update/${id}`, data)
    return response.data
}

export async function deleteProduct(id) {
    let response = await api.post(`/admin/delete/${id}`)
    return response.data
}