import axios from 'axios';

// Backend URL from Vite environment or fallback to local server
const LIVE_API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

// Create axios instance
const api = axios.create({
    baseURL: LIVE_API_URL,  // Correct
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add token to every request automatically
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
