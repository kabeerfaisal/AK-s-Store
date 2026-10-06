import axios from 'axios'


let api = axios.create({
    baseURL: import.meta.env.VITE_backend_url || 'http://localhost:5000/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    }
})

export default api

