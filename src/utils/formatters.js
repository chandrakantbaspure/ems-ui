export function formatSalary(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR'
  }).format(amount);
}

export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}
