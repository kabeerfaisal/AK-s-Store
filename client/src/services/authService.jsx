import api from "../Config/ApiConfig"


export async function loginUser(data) {
    let response = await api.post('/auth/login', data)
    return response.data
}

export async function registerUser(data) {
    let response = await api.post('/auth/register', data)
    return response.data
}