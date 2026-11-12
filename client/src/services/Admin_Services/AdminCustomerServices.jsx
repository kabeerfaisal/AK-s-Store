import api from "../../Config/ApiConfig"


export const getAllCustomers = async () => {
    const response = await api.get("/customer")
    return response.data
}

export const getCustomerDetails = async (id) => {
    const response = await api.get(`/customer/${id}`)
    return response.data
}

export const updateCustomerRole = async (id, role) => {
    const response = await api.patch(`/customer/${id}/role`, {role})
    return response.data
}

export const deleteCustomer = async (id) => {
    const response = await api.delete(`/customer/${id}`)
    return response.data
}