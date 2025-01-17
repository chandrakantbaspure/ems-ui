import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useThemeStore = defineStore('theme', () => {
  const isDarkMode = ref(false);
  const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function setTheme(isDark) {
    isDarkMode.value = isDark;
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');

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
      setTheme(false);
    }
  }

  systemPrefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      setTheme(false);
    }
  });

  initializeTheme();

  return {
    isDarkMode,
    toggleTheme,
    setTheme
  };
});