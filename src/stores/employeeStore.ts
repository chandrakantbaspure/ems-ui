import {defineStore} from 'pinia';
import {ref} from 'vue';
import axios from 'axios';
import type {Employee} from '../types/employee';
import {useToast} from 'vue-toastification';
import {computed} from "vue";
const API_BASE_URL = 'http://localhost:8082/api/employees';
const toast = useToast();

export const useEmployeeStore = defineStore('employee', () => {
    const employees = ref<Employee[]>([]);
    const loading = ref(false);
    const error = ref<string | null>(null);
    const itemsPerPage = 10;
    const currentPage = ref(1);
    const totalPages = computed(() => Math.ceil(employees.value.length / itemsPerPage));
    const paginatedEmployees = computed(() => {
        const start = (currentPage.value - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return employees.value.slice(start, end);
    });

    async function fetchEmployees() {
        try {
            loading.value = true;
            const response = await axios.get(API_BASE_URL);
            employees.value = response.data;
            toast.success('Employees loaded successfully');
        } catch (err) {
            error.value = 'Failed to fetch employees';
            toast.error('Failed to load employees');
            console.error('Error fetching employees:', err);
        } finally {
            loading.value = false;
        }
    }

    async function addEmployee(employee: Omit<Employee, 'employeeId'>) {
        try {
            loading.value = true;
            await axios.post(`${API_BASE_URL}/addEmployee`, employee);
            await fetchEmployees();
            toast.success('Employee added successfully');
        } catch (err) {
            toast.error('Failed to add employee');
            console.error('Error adding employee:', err);
        } finally {
            loading.value = false;
        }
    }

    async function updateEmployee(employee: Employee) {
        try {
            loading.value = true;
            await axios.put(`${API_BASE_URL}/updateEmployee/${employee.employeeId}`, employee);
            await fetchEmployees();
            toast.success('Employee updated successfully');
        } catch (err) {
            toast.error('Failed to update employee');
            console.error('Error updating employee:', err);
        } finally {
            loading.value = false;
        }
    }

    async function deleteEmployee(id: number) {
        try {
            loading.value = true;
            await axios.delete(`${API_BASE_URL}/deleteEmployee/${id}`);
            await fetchEmployees();
            toast.success('Employee deleted successfully');
        } catch (err) {
            toast.error('Failed to delete employee');
            console.error('Error deleting employee:', err);
        } finally {
            loading.value = false;
        }
    }

    return {
        employees,
        loading,
        error,
        currentPage,
        totalPages,
        fetchEmployees,
        addEmployee,
        updateEmployee,
        deleteEmployee,
        paginatedEmployees
    };
});