<template>
  <div class="card stat-card" :class="colorClass">
    <div class="card-body">
      <div class="d-flex align-items-center mb-3">
        <div class="stat-icon-container">
          <i :class="['bi', icon, 'stat-icon']"></i>
        </div>
        <div class="ms-3">
          <h5 class="card-subtitle">{{ title }}</h5>
          <h2 class="card-title mb-0">{{ value }}</h2>
        </div>
      </div>
      <div class="stat-footer">
        <small class="text-muted">{{ footer }}</small>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: String,
    required: true
  },
  footer: {
    type: String,
    required: true
  },
  colorClass: {
    type: String,
    default: 'stat-card-primary'
  }
});
</script>

<style scoped>
.stat-card {
  transition: transform 0.3s, box-shadow 0.3s;
  border: none;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.stat-icon-container {
  background: rgba(var(--primary-rgb), 0.1);
  padding: 1rem;
  border-radius: 50%;
}

.stat-icon {
  font-size: 1.5rem;
  opacity: 0.9;
}

.card-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--text-color);
}

.card-subtitle {
  font-size: 0.875rem;
  color: var(--text-muted);
  margin-bottom: 0.25rem;
}

.stat-footer {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--border-color);
}

.stat-card-primary .stat-icon { color: var(--primary-color); }
.stat-card-success .stat-icon { color: #42b883; }
.stat-card-info .stat-icon { color: #4BC0C0; }
.stat-card-warning .stat-icon { color: #FFA726; }
</style>