import {defineStore} from 'pinia';
import {ref} from 'vue';
import {useToast} from 'vue-toastification';
import axiosInstance from '../stores/axiosConfig';
import router from "../router/index.js";
export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const token = ref(localStorage.getItem('auth'));
    const toast = useToast();

    async function login(credentials) {
        try {
            const response = await axiosInstance.post('/auth/login', credentials);
            console.log(response.data);
            const authToken = btoa(`${credentials.email}:${credentials.password}`);
            token.value = authToken;
            user.value = response.data.user;
            localStorage.setItem('auth', authToken);
            return response.data;
        } catch (error) {
            console.error(error);
            const message = error.response?.data?.message || 'Login failed';
            toast.error(message);
            throw new Error(message);
        }
    }

    async function signup(userData) {
        try {
            const response = await axiosInstance.post('/auth/signup', userData);
            toast.success('Registration successful! Please login.');
            return response.data;
        } catch (error) {
            const message = error.response?.data?.message || 'Registration failed';
            toast.error(message);
            throw new Error(message);
        }
    }

    function logout() {
        try {
            user.value = null;
            token.value = null;
            router.push('/login');
            localStorage.removeItem('auth');
            localStorage.removeItem('user');
        } catch (error) {
            toast.error('Error during logout');
            console.error('Logout error:', error);
        }
    }

    return {
        user,
        token,
        login,
        signup,
        logout
    };
});