/*
  * 다크모드/라이트모드 전환
  * src/stores/darkMode.js
*/


import { defineStore } from 'pinia';
import { ref, watch } from 'vue';

export const useDarkModeStore = defineStore('darkMode', () => {

  const isDark = ref(localStorage.getItem('isDark') === 'true');

  watch(isDark, (val) => {
    localStorage.setItem('isDark', val);
    document.documentElement.classList.toggle('dark', val);
  }, { immediate: true })

  const toggleDarkMode = () => {
    isDark.value = !isDark.value;
  }

  return {
    isDark,
    toggleDarkMode
  }

})