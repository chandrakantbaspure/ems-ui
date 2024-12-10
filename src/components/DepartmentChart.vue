<template>
  <div class="department-chart">
    <Pie :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Pie } from 'vue-chartjs';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  employees: {
    type: Array,
    required: true
  }
});

const departmentCounts = computed(() => {
  const counts = {};
  props.employees.forEach(emp => {
    counts[emp.department] = (counts[emp.department] || 0) + 1;
  });
  return counts;
});

const chartData = computed(() => ({
  labels: Object.keys(departmentCounts.value),
  datasets: [{
    data: Object.values(departmentCounts.value),
    backgroundColor: [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40'
    ]
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom'
    }
  }
};
</script>

<style scoped>
.department-chart {
  height: 300px;
}
</style>