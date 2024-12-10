import { computed } from 'vue';
import { formatSalary } from '../utils/formatters';
import {sum} from "lodash-es";

export function useEmployeeStats(employees) {
  if (!employees.value || !Array.isArray(employees.value)) {
    return {
      statsData: [],
      departmentDistribution: {},
      totalEmployees: 0,
      uniqueDepartments: [],
      averageAge: 0,
      totalSalary: 0,
      averageSalary: 0,
      newHiresCount: 0
    };
  }

  const totalEmployees = computed(() => employees.value.length);

  const uniqueDepartments = computed(() => 
    [...new Set(employees.value.map(emp => emp.department))]
  );

  const averageAge = computed(() => {
    if (employees.value.length === 0) return 0;
    const total = employees.value.reduce((sum,emp => emp.age || 0), 0);
    return Math.round(total / employees.value.length);
  });

  const totalSalary = computed(() => 
    employees.value.reduce((sum, emp) => sum + (emp.salary || 0), 0)
  );

  const averageSalary = computed(() => 
    totalSalary.value / (employees.value.length || 1)
  );

  const newHiresCount = computed(() => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    return employees.value.filter(emp => 
      emp.joiningDate && new Date(emp.joiningDate) >= thirtyDaysAgo
    ).length;
  });

  const departmentDistribution = computed(() => {
    const distribution = {};
    employees.value.forEach(emp => {
      if (emp.department) {
        distribution[emp.department] = (distribution[emp.department] || 0) + 1;
      }
    });
    return distribution;
  });

  const statsData = computed(() => [
    {
      title: 'Total Employees',
      value: totalEmployees.value,
      icon: 'bi-people',
      footer: `Across ${uniqueDepartments.value.length} departments`,
      colorClass: 'stat-card-primary'
    },
    {
      title: 'Total Payroll',
      value: formatSalary(totalSalary.value),
      icon: 'bi-currency-dollar',
      footer: `Avg: ${formatSalary(averageSalary.value)}/person`,
      colorClass: 'stat-card-success'
    },
    {
      title: 'Average Age',
      value: averageAge.value,
      icon: 'bi-person-badge',
      footer: 'Years old',
      colorClass: 'stat-card-info'
    },
    {
      title: 'New Hires',
      value: newHiresCount.value,
      icon: 'bi-calendar-check',
      footer: 'Last 30 days',
      colorClass: 'stat-card-warning'
    }
  ]);

  return {
    statsData,
    departmentDistribution,
    totalEmployees,
    uniqueDepartments,
    averageAge,
    totalSalary,
    averageSalary,
    newHiresCount
  };
}