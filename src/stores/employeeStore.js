import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import { useToast } from 'vue-toastification';

const API_BASE_URL = 'http://localhost:8082/api/employees';

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function fetchEmployees() {
    const toast = useToast();
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

  async function addEmployee(employee) {
    const toast = useToast();
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

  async function updateEmployee(employee) {
    const toast = useToast();
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

  async function deleteEmployee(id) {
    const toast = useToast();
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

  async function sortEmployees(sortBy, order) {
    const toast = useToast();
    try {
      loading.value = true;
      const response = await axios.get(`${API_BASE_URL}/sortemployees?field=${sortBy}&order=${order}`);
      employees.value = response.data;
      toast.success('Employees sorted successfully');
    } catch (err) {
      toast.error('Failed to sort employees');
      console.error('Error sorting employees:', err);
    } finally {
      loading.value = false;
    }
  }

  return {
    employees,
    loading,
    error,
    fetchEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    sortEmployees
  };
});