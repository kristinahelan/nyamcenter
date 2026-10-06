/**
 * Theme Manager (Dark / Light Mode)
 */

import { showToast } from './utils.js';

export function initTheme() {
  const savedTheme = localStorage.getItem('savoria_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);

  const themeBtn = document.getElementById('theme-toggle-btn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('savoria_theme', next);
      showToast(`Mode ${next === 'dark' ? 'Gelap 🌙' : 'Terang ☀️'} diaktifkan`);
    });
  }
}
