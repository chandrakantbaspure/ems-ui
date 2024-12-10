<template>
  <div class="empty-state">
    <i class="bi" :class="icon"></i>
    <h4>{{ title }}</h4>
    <p>{{ message }}</p>
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  icon: {
    type: String,
    default: 'bi-inbox'
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});
</script>

<style scoped>
.empty-state {
  text-align: center;
  padding: 3rem 1rem;
  color: var(--text-color);
}

.empty-state i {
  font-size: 3rem;
  margin-bottom: 1rem;
  opacity: 0.5;
}

.empty-state h4 {
  margin-bottom: 0.5rem;
}

.empty-state p {
  color: var(--text-color);
  opacity: 0.7;
}
</style>