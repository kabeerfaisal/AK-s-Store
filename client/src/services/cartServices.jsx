import api from "../Config/ApiConfig"


export const getCart = async () => {
    let response = await api.get('/cart')
    return response.data
}

export const addToCart = async (cartData) => {
    let response = await api.post('/cart/add-cart', cartData)
    return response.data

}

export const updateCartQuantity = async (updateData) => {
    let response = await api.patch('/cart/update-cart', updateData)
    return response.data
}

export const removeProduct = async (removeData) => {
    let response = await api.delete('/cart/remove-product', {data: removeData})
    return response.data
}

export const removeCart = async () => {
    let response = await api.delete('/cart/remove-cart')
    return response.data
}