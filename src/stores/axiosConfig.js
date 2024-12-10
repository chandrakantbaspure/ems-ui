import axios from 'axios';
import router from '../router';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8082/api'
});

axiosInstance.interceptors.request.use(config => {
    const auth = localStorage.getItem('auth');
    if (auth) {
        config.headers.Authorization = `Basic ${auth}`;
    }
    return config;
});

axiosInstance.interceptors.response.use(
    response => response,
    error => {
        if (error.response?.status === 401) {
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
            router.push('/login');
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;