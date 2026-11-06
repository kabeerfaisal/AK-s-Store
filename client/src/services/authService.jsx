import api from "../Config/ApiConfig"


export async function loginUser(data) {
    let response = await api.post('/auth/login', data)
    console.log("Backend Response Object:", response.data)
    return response.data
}

export async function registerUser(data) {
    let response = await api.post('/auth/register', data)
    return response.data
}

export const googleAuthService = async (accessToken) => {
    const response = await api.post('/auth/google', { accessToken });
    return response.data;
};

export const forgetPassword = async (email) => {
    const response = await api.post('/auth/forgot-password', { email });
    return response.data;
}

export const resetPassword = async (token, newPassword) => {
    const response = await api.post('/auth/reset-password', { token, newPassword });
    return response.data;
}