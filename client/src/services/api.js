import axios from 'axios';

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Interceptor to add JWT Auth token to headers
API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('cropcycle_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Interceptor to handle global response errors
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Optional auto logout on expired token
            if (localStorage.getItem('cropcycle_token')) {
                localStorage.removeItem('cropcycle_token');
                localStorage.removeItem('cropcycle_user');
            }
        }
        return Promise.reject(error);
    }
);

export default API;
