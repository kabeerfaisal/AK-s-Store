import axios from 'axios'


let api = axios.create({
    baseURL: import.meta.env.VITE_backend_url,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api

