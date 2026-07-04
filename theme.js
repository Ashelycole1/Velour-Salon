/**
 * theme.js — Velour Salon Dark / Light Mode Toggle
 * Optimized: No forced reflow, SVG icon toggle
 */

// Theme initialization is now inlined in HTML head

// SVG paths for moon and sun icons
const MOON_PATH = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
const SUN_PATH = "M12 2v2m0 16v2M4.93 4.93l1.41 1.41m9.9 9.9 1.41 1.41M2 12h2m16 0h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41M12 7a5 5 0 1 0 0 10A5 5 0 0 0 12 7z";

document.addEventListener('DOMContentLoaded', () => {
  const themeToggles = document.querySelectorAll('.theme-toggle');

  // Update all SVG icons based on theme
  const updateIcons = (theme) => {
    const path = theme === 'dark' ? SUN_PATH : MOON_PATH;
    document.querySelectorAll('#theme-icon path, #mobile-theme-icon path').forEach(p => {
      p.setAttribute('d', path);
    });
    // Fallback: update any remaining <i> elements
    document.querySelectorAll('.theme-toggle i').forEach(i => {
      i.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    });
  };

  // Set initial icon state
  const currentTheme = document.documentElement.getAttribute('data-theme');
  updateIcons(currentTheme);

  // Toggle theme on click
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('velour-theme', next);
      updateIcons(next);
    });
  });

  // Navbar scroll shadow — use scrollY only (no forced reflow from layout reads)
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const theme = document.documentElement.getAttribute('data-theme');
          if (window.scrollY > 40) {
            navbar.style.boxShadow = theme === 'dark'
              ? '0 4px 30px rgba(0,0,0,0.5)'
              : '0 4px 20px rgba(0,0,0,0.08)';
          } else {
            navbar.style.boxShadow = 'none';
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
  }
});
