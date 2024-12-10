export interface Employee {
  employeeId: number;
  name: string;
  age: number;
  department: string;
  designation: string;
  salary: number;
  address: string;
  joiningDate: string;
}

export interface SortOption {
  label: string;
  value: string;
  order: 'asc' | 'desc';
}