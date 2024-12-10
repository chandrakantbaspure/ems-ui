<template>
  <div class="dashboard">
    <div class="row g-4 mb-4">
      <template v-if="!employeeStore.loading && stats">
        <div v-for="stat in stats.statsData" :key="stat.title" class="col-md-3">
          <StatCard v-bind="stat" />
        </div>
      </template>
      <div v-else class="col-12">
        <LoadingSpinner message="Loading dashboard stats..." />
      </div>
    </div>

    <div class="row g-4">
      <div class="col-md-6">
        <DashboardCard title="Department Distribution">
          <template #actions>
            <button 
              class="btn btn-link" 
              @click="refreshData" 
              :disabled="employeeStore.loading"
            >
              <i class="bi" :class="employeeStore.loading ? 'bi-arrow-repeat spin' : 'bi-arrow-clockwise'"></i>
            </button>
          </template>
          <DepartmentChart :employees="employeeStore.employees" />
        </DashboardCard>
      </div>
      
      <div class="col-md-6">
        <DashboardCard title="Age Distribution">
          <AgeDistributionChart :employees="employeeStore.employees" />
        </DashboardCard>
      </div>
    </div>

    <div class="row g-4 mt-2">
      <div class="col-md-8">
        <DashboardCard title="Salary Distribution">
          <SalaryChart :employees="employeeStore.employees" />
        </DashboardCard>
      </div>
      
      <div class="col-md-4">
        <DashboardCard title="Recent Employees">
          <template #actions>
            <router-link to="/employees" class="btn btn-link">
              View All
            </router-link>
          </template>
          <div v-if="recentEmployees.length > 0" class="list-group list-group-flush">
            <div v-for="employee in recentEmployees" 
                 :key="employee.employeeId" 
                 class="list-group-item">
              <div class="d-flex justify-content-between align-items-center">
                <div>
                  <h6 class="mb-0">{{ employee.name }}</h6>
                  <small class="text-muted">{{ employee.department }}</small>
                </div>
                <small class="text-muted">{{ formatDate(employee.joiningDate) }}</small>
              </div>
            </div>
          </div>
          <EmptyState
            v-else
            icon="bi-person-plus"
            title="No Recent Employees"
            message="No employees have been added recently"
          />
        </DashboardCard>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue';
import { useEmployeeStore } from '../stores/employeeStore';
import { useEmployeeStats } from '../composables/useEmployeeStats';
import { formatDate } from '../utils/formatters';
import StatCard from '../components/StatCard.vue';
import DashboardCard from '../components/DashboardCard.vue';
import DepartmentChart from '../components/DepartmentChart.vue';
import SalaryChart from '../components/SalaryChart.vue';
import AgeDistributionChart from '../components/AgeDistributionChart.vue';
import LoadingSpinner from '../components/LoadingSpinner.vue';
import EmptyState from '../components/EmptyState.vue';

const employeeStore = useEmployeeStore();
const stats = ref(null);

const recentEmployees = computed(() => {
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  if (!employeeStore.employees.length) return [];
  return [...employeeStore.employees]
      .filter(employee => new Date(employee.joiningDate) >= thirtyDaysAgo)
      .sort((a, b) => new Date(b.joiningDate) - new Date(a.joiningDate))
      .slice(0, 5);
});

async function refreshData() {
  await employeeStore.fetchEmployees();
  updateStats();
}

function updateStats() {
  stats.value = useEmployeeStats(computed(() => employeeStore.employees));
}

onMounted(async () => {
  if (employeeStore.employees.length === 0) {
    await employeeStore.fetchEmployees();
  }
  updateStats();
});

</script>

<style lang="scss" scoped>
.dashboard {
  animation: fadeIn 0.3s ease-in-out;
}

.list-group-item {
  background-color: transparent;
  border-color: var(--border-color);
  transition: background-color 0.2s;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

.btn-link {
  color: var(--primary-color);
  text-decoration: none;
  
  &:hover {
    color: var(--secondary-color);
  }
}
</style>