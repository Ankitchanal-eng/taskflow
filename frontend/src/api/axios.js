import axios from 'axios';

// Your Render backend URL
const LIVE_API_URL = 'https://taskflow-m3nm.onrender.com';

// Create axios instance
const api = axios.create({
    baseURL: LIVE_API_URL,   // <-- FIXED
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add token to every request
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
