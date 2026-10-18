import api from "../../Config/ApiConfig";


export async function addProduct(data) {
    let response = await api.post('/admin/post', data)
    return response.data
}

export async function getProducts() {
    let response = await api.get('/products')
    return response.data
}
export async function getProductsByFilter(categoryId, params = {}) {
    const url = (!categoryId || categoryId === 'all') 
    ? '/products' 
    : `/products/category/${categoryId}`;
    let response = await api.get(url, {params})
    return response.data
}

export async function updateProduct(id, data) {
    let response = await api.post(`/admin/update/${id}`, data)
    return response.data
}

export async function deleteProduct(id) {
    let response = await api.post(`/admin/delete/${id}`)
    return response.data
}