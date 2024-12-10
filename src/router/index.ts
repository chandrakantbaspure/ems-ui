import {createRouter, createWebHistory} from 'vue-router';
import Dashboard from '../views/Dashboard.vue';
import EmployeeList from '../views/EmployeeList.vue';
import EmployeeForm from '../views/EmployeeForm.vue';
import Profile from "../views/Profile.vue";
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Dashboard',
            component: Dashboard
        },
        {
            path: '/employees',
            name: 'EmployeeList',
            component: EmployeeList
        },
        {
            path: '/employee/add',
            name: 'AddEmployee',
            component: EmployeeForm
        },
        {
            path: '/employee/edit/:id',
            name: 'EditEmployee',
            component: EmployeeForm,
            props: true
        },
        {
            path: '/profile',
            name: 'Profile',
            component: Profile
        }
    ]
});

export default router;