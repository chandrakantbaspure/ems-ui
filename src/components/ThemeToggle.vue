<template>
  <button 
    @click="themeStore.toggleTheme" 
    class="theme-toggle"
    :title="themeStore.isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
  >
    <transition name="theme-icon" mode="out-in">
      <i 
        :key="themeStore.isDarkMode" 
        class="bi" 
        :class="themeStore.isDarkMode ? 'bi-sun-fill' : 'bi-moon-stars-fill'"
      ></i>
    </transition>
  </button>
</template>

<script setup>
import { useThemeStore } from '../stores/themeStore';

const themeStore = useThemeStore();
</script>

<style scoped>
.theme-toggle {
  background: transparent;
  border: none;
  padding: 0.5rem;
  font-size: 1.25rem;
  color: var(--text-color);
  cursor: pointer;
  transition: transform 0.3s, color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.theme-toggle:hover {
  transform: rotate(15deg);
  background-color: var(--hover-bg);
}

.theme-icon-enter-active,
.theme-icon-leave-active {
  transition: all 0.3s;
}

.theme-icon-enter-from,
.theme-icon-leave-to {
  opacity: 0;
  transform: rotate(30deg) scale(0.7);
}

.theme-icon-enter-to,
.theme-icon-leave-from {
  opacity: 1;
  transform: rotate(0) scale(1);
}
</style>