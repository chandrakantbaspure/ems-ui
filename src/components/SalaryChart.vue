<template>
  <div class="salary-chart">
    <Line :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

const chartData = computed(() => {
  const sortedEmployees = [...props.employees].sort((a, b) => a.salary - b.salary);
  return {
    labels: sortedEmployees.map(emp => emp.name),
    datasets: [{
      label: 'Salary Distribution',
      data: sortedEmployees.map(emp => emp.salary),
      borderColor: '#42b883',
      backgroundColor: 'rgba(66, 184, 131, 0.2)',
      tension: 0.4
    }]
  };
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => `$${context.raw.toLocaleString()}`
      }
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: (value) => `$${value.toLocaleString()}`
      }
    }
  }
};
</script>

<style scoped>
.salary-chart {
  height: 300px;
}
</style>