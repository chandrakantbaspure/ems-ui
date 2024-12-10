<template>
  <div class="card dashboard-card h-100">
    <div class="card-header">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="card-title mb-0">{{ title }}</h5>
        <div class="card-actions">
          <slot name="actions"></slot>
        </div>
      </div>
    </div>
    <div class="card-body">
      <slot></slot>
    </div>
    <div v-if="$slots.footer" class="card-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.dashboard-card {
  transition: transform 0.2s, box-shadow 0.2s;
  background-color: var(--card-background);
  border: 1px solid var(--border-color);
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  background-color: transparent;
  border-bottom: 1px solid var(--border-color);
  padding: 1rem;
}

.card-title {
  color: var(--text-color);
  font-weight: 600;
}

.card-body {
  padding: 1.25rem;
}

.card-footer {
  background-color: transparent;
  border-top: 1px solid var(--border-color);
  padding: 1rem;
}
</style>