/**
 * theme.js — Velour Salon Dark / Light Mode Toggle
 */

// 1. Apply saved theme before page renders to prevent flash
(function () {
  const savedTheme = localStorage.getItem('velour-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
})();

document.addEventListener('DOMContentLoaded', () => {
  const themeToggles = document.querySelectorAll('.theme-toggle');

  // Function to update icon based on theme
  const updateIcon = (theme) => {
    themeToggles.forEach(toggle => {
      const themeIcon = toggle.querySelector('i');
      if (!themeIcon) return;
      if (theme === 'dark') {
        themeIcon.className = 'fas fa-sun'; // Sun for dark mode
      } else {
        themeIcon.className = 'fas fa-moon'; // Moon for light mode
      }
    });
  };

  // Initial icon state
  const currentTheme = document.documentElement.getAttribute('data-theme');
  updateIcon(currentTheme);

  // Toggle theme on click
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('velour-theme', next);
      updateIcon(next);
    });
  });

  // 4. Navbar Scroll Shadow
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        const theme = document.documentElement.getAttribute('data-theme');
        navbar.style.boxShadow = theme === 'dark' 
          ? '0 4px 30px rgba(0,0,0,0.5)' 
          : '0 4px 20px rgba(0,0,0,0.08)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    });
  }
});
