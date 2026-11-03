import api from "../Config/ApiConfig"


export const createOrder = async (orderData) => {
    let response = await api.post('/order/create', orderData)
    return response.data
}

export const getMyOrders = async () => {
    let response = await api.get('/order')
    return response.data
}

export const getOrderById = async (orderId) => {
    let response = await api.get(`/order/${orderId}`)
    return response.data
}