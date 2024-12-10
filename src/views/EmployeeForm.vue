<template>
  <div class="employee-form">
    <h2>{{ isEditing ? 'Edit Employee' : 'Add New Employee' }}</h2>
    
    <div class="card">
      <div class="card-body">
        <form @submit.prevent="handleSubmit" class="row g-3">
          <div class="col-md-6">
            <label class="form-label">Name</label>
            <input
              v-model="form.name"
              type="text"
              class="form-control"
              required
            >
          </div>

          <div class="col-md-6">
            <label class="form-label">Age</label>
            <input
              v-model.number="form.age"
              type="number"
              class="form-control"
              required
              min="18"
              max="100"
            >
          </div>

          <div class="col-md-6">
            <label class="form-label">Department</label>
            <select v-model="form.department" class="form-select" required>
              <option value="">Select Department</option>
              <option v-for="dept in departments" :key="dept" :value="dept">
                {{ dept }}
              </option>
            </select>
          </div>

          <div class="col-md-6">
            <label class="form-label">Designation</label>
            <input
              v-model="form.designation"
              type="text"
              class="form-control"
              required
            >
          </div>

          <div class="col-md-6">
            <label class="form-label">Salary</label>
            <input
              v-model.number="form.salary"
              type="number"
              class="form-control"
              required
              min="0"
            >
          </div>

          <div class="col-md-6">
            <label class="form-label">Joining Date</label>
            <input
              v-model="form.joiningDate"
              type="date"
              class="form-control"
              required
            >
          </div>

          <div class="col-12">
            <label class="form-label">Address</label>
            <textarea
              v-model="form.address"
              class="form-control"
              rows="3"
              required
            ></textarea>
          </div>

          <div class="col-12">
            <button type="submit" class="btn btn-primary me-2">
              {{ isEditing ? 'Update' : 'Add' }} Employee
            </button>
            <router-link to="/employees" class="btn btn-secondary">
              Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useEmployeeStore } from '../stores/employeeStore';
import type { Employee } from '../types/employee';

const route = useRoute();
const router = useRouter();
const employeeStore = useEmployeeStore();

const isEditing = computed(() => !!route.params.id);
const departments = ['IT', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];

const form = ref<Omit<Employee, 'employeeId'>>({
  name: '',
  age: 0,
  department: '',
  designation: '',
  salary: 0,
  address: '',
  joiningDate: ''
});

onMounted(async () => {
  if (isEditing.value) {
    const employeeId = parseInt(route.params.id as string);
    const employee = employeeStore.employees.find(e => e.employeeId === employeeId);
    if (employee) {
      form.value = { ...employee };
    }
  }
});

async function handleSubmit() {
  try {
    if (isEditing.value) {
      await employeeStore.updateEmployee({
        ...form.value,
        employeeId: parseInt(route.params.id as string)
      });
    } else {
      await employeeStore.addEmployee(form.value);
    }
    router.push('/employees');
  } catch (error) {
    console.error('Error submitting form:', error);
  }
}
</script>