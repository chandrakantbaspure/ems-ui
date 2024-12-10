<template>
  <div class="employee-list">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>Employee List</h2>
      <router-link to="/employee/add" class="btn btn-primary">
        <i class="bi bi-plus"></i> Add Employee
      </router-link>
    </div>

    <div class="card mb-4">
      <div class="card-body">
        <div class="row g-3">
          <div class="col-md-4">
            <input
                v-model="searchQuery"
                type="text"
                class="form-control"
                placeholder="Search by name or ID..."
                @input="handleSearch"
            >
          </div>
          <div class="col-md-3">
            <select v-model="selectedSort" class="form-select" @change="handleSort">
              <option v-for="option in sortOptions" :key="option.value" :value="option">
                {{ option.label }}
              </option>
            </select>

          </div>
          <div class="col-md-3">
            <input
                v-model="dateFilter"
                type="date"
                class="form-control"
                placeholder="Filter by joining date"
                @input="handleDateFilter"
            >
          </div>
          <div class="col-md-2">
            <button class="btn btn-secondary btn-secondary" @click="resetFilters">Reset</button>
          </div>
        </div>
      </div>

      <LoadingSpinner v-if="employeeStore.loading"/>

      <EmptyState
          v-else-if="filteredEmployees.length === 0"
          icon="bi-people"
          title="No Employees Found"
          message="Try adjusting your search or filters"
      />

      <div v-else class="table-responsive ">
        <table class="table table-hover">
          <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Designation</th>
            <th>Age</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="employee in filteredEmployees" :key="employee.employeeId">
            <td>{{ employee.employeeId }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.department }}</td>
            <td>{{ employee.designation }}</td>
            <td>{{ employee.age }}</td>
            <td>{{ formatSalary(employee.salary) }}</td>
            <td>
              <div class="btn-group">
                <router-link
                    :to="`/employee/edit/${employee.employeeId}`"
                    class="btn btn-sm btn-outline-primary"
                >
                  <i class="bi bi-pencil"></i>
                </router-link>
                <button
                    @click="confirmDelete(employee)"
                    class="btn btn-sm btn-outline-danger"
                >
                  <i class="bi bi-trash"></i>
                </button>
              </div>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref, computed, onMounted} from 'vue';
import {useEmployeeStore} from '../stores/employeeStore';
import {useToast} from 'vue-toastification';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import EmptyState from '../components/EmptyState.vue';
import {formatSalary} from '../utils/formatters';

const employeeStore = useEmployeeStore();
const toast = useToast();

const searchQuery = ref('');
const dateFilter = ref('');
const selectedSort = ref({
  label: 'ID (Ascending)',
  value: 'employeeId',
  order: 'asc'
});


const sortOptions = [
  {label: 'Name (A-Z)', value: 'name', order: 'asc'},
  {label: 'Name (Z-A)', value: 'name', order: 'desc'},
  {label: 'ID (Ascending)', value: 'employeeId', order: 'asc'},
  {label: 'ID (Descending)', value: 'employeeId', order: 'desc'},
  {label: 'Joining Date (Newest)', value: 'joiningDate', order: 'desc'},
  {label: 'Joining Date (Oldest)', value: 'joiningDate', order: 'asc'}
];

const filteredEmployees = computed(() => {
  let filtered = [...employeeStore.employees];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(emp =>
        emp.name.toLowerCase().includes(query) ||
        emp.employeeId.toString().includes(query)
    );
  }

  if (dateFilter.value) {
    filtered = filtered.filter(emp =>
        new Date(emp.joiningDate) >= new Date(dateFilter.value)
    );
  }


  return filtered;
});

function resetFilters() {
  searchQuery.value = '';
  dateFilter.value = '';
  selectedSort.value = {
    label: 'ID (Ascending)',
    value: 'employeeId',
    order: 'asc'
  };
  employeeStore.employees.sort((a, b) => {
    if (selectedSort.value.order === 'asc') {
      return a[selectedSort.value.value] > b[selectedSort.value.value] ? 1 : -1;
    } else {
      return a[selectedSort.value.value] < b[selectedSort.value.value] ? 1 : -1;
    }
  });
  toast.success('Filters reset successfully!');
}

async function confirmDelete(employee) {
  if (confirm(`Are you sure you want to delete ${employee.name}?`)) {
    await employeeStore.deleteEmployee(employee.employeeId);
  }
}

async function handleSort() {
  console.log('Sorting:', selectedSort.value);
  employeeStore.employees.sort((a, b) => {
    if (selectedSort.value.order === 'asc') {
      return a[selectedSort.value.value] > b[selectedSort.value.value] ? 1 : -1;
    } else {
      return a[selectedSort.value.value] < b[selectedSort.value.value] ? 1 : -1;
    }
  });
  toast.success('Employees sorted successfully!');
  console.log('Employees sorted:', employeeStore.employees);
}

function handleSearch() {
  console.log('Searching:', searchQuery.value);
}

function handleDateFilter() {
  console.log('Date filter changed:', dateFilter.value);
}

onMounted(async () => {
  await employeeStore.fetchEmployees();
});
</script>

<style scoped>
.employee-list {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.table {
  background-color: var(--card-background);
}

.table th {
  background-color: var(--card-background);
  border-bottom-color: var(--border-color);
}

.table td {
  border-bottom-color: var(--border-color);
}
</style>