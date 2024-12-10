import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(isDark) {
    isDarkMode.value = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
    
    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute('content', isDark ? '#1a1a1a' : '#ffffff');
    }
  }

  function toggleTheme() {
    setTheme(!isDarkMode.value);
  }

  function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme === 'dark');
    } else {
      setTheme(systemPrefersDark.matches);
    }
  }

  // Watch for system theme changes
  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(e.matches);
    }
  });

  // Initialize theme on store creation
  initializeTheme();

  return {
    isDarkMode,
    toggleTheme,
    setTheme
  };
});