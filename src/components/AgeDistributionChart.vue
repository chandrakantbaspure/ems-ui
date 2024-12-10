<template>
  <div class="age-distribution-chart">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Bar } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  employees: {
    type: Array,
    required: true
  }
});

const ageRanges = computed(() => {
  const ranges = {
    '20-30': 0,
    '31-40': 0,
    '41-50': 0,
    '51+': 0
  };
  
  props.employees.forEach(emp => {
    if (emp.age <= 30) ranges['20-30']++;
    else if (emp.age <= 40) ranges['31-40']++;
    else if (emp.age <= 50) ranges['41-50']++;
    else ranges['51+']++;
  });
  
  return ranges;
});

const chartData = computed(() => ({
  labels: Object.keys(ageRanges.value),
  datasets: [{
    label: 'Age Distribution',
    data: Object.values(ageRanges.value),
    backgroundColor: [
      'rgba(255, 99, 132, 0.5)',
      'rgba(54, 162, 235, 0.5)',
      'rgba(255, 206, 86, 0.5)',
      'rgba(75, 192, 192, 0.5)'
    ],
    borderColor: [
      'rgba(255, 99, 132, 1)',
      'rgba(54, 162, 235, 1)',
      'rgba(255, 206, 86, 1)',
      'rgba(75, 192, 192, 1)'
    ],
    borderWidth: 1
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        stepSize: 1
      }
    }
  }
};
</script>

<style scoped>
.age-distribution-chart {
  height: 300px;
}
</style>