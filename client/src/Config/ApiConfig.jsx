import axios from 'axios'


let api = axios.create({
    baseURL: import.meta.env.VITE_backend_url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})


api.interceptors.request.use(
    (config)=>{
        try {
            const token = localStorage.getItem('token')
            if (token) {
                config.headers.Authorization = `Bearer ${token}`
            }
            return config
            
        } catch (error) {
           return Promise.reject(error)
           console.log("catch error:", error) 
        }
    }
)

export default api

