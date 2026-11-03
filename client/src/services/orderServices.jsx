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

export const getAllOrders = async (status = 'All') => {
    let response = await api.get(`/order/all?status=${status}`)
    return response.data
}

export const updateOrderStatus = async (orderId, status) => {
    const payload = typeof status === 'string' ? { orderStatus: status } : status;
    let response = await api.put(`/order/${orderId}/status`, payload)
    return response.data
}