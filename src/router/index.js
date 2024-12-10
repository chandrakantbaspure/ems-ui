import {createRouter, createWebHistory} from 'vue-router';
import {useAuthStore} from '../stores/authStores.js';
import Profile from "../views/Profile.vue";

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue'),
        meta: {requiresAuth: false}
    },
    {
        path: '/signup',
        name: 'Signup',
        component: () => import('../views/Signup.vue'),
        meta: {requiresAuth: false}
    },
    {
        path: '/',
        name: 'Dashboard',
        component: () => import('../views/Dashboard.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/employees',
        name: 'EmployeeList',
        component: () => import('../views/EmployeeList.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/employee/add',
        name: 'AddEmployee',
        component: () => import('../views/EmployeeForm.vue'),
        meta: {requiresAuth: true}
    },
    {
        path: '/employee/edit/:id',
        name: 'EditEmployee',
        component: () => import('../views/EmployeeForm.vue'),
        props: true,
        meta: {requiresAuth: true}
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: {requiresAuth: true}
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

    if (requiresAuth && !authStore.token) {
        next('/login');
    } else if (!requiresAuth && authStore.token && to.path !== '/') {
        next('/');
    } else {
        next();
    }
});

export default router;