/**
 * Comportamiento mínimo del sitio: menú móvil y año del pie de página.
 * La página funciona completa sin JavaScript; esto solo mejora la experiencia.
 */
(() => {
  'use strict';

  function initMenu() {
    const toggle = document.querySelector('[data-menu-toggle]');
    const menu = document.querySelector('[data-menu]');
    if (!toggle || !menu) return;

    const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';
    const setOpen = (open) => {
      toggle.setAttribute('aria-expanded', String(open));
      menu.dataset.open = String(open);
    };

    toggle.addEventListener('click', () => setOpen(!isOpen()));

    // Cerrar al elegir un destino o con Escape.
    menu.addEventListener('click', (event) => {
      if (event.target.closest('a')) setOpen(false);
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && isOpen()) {
        setOpen(false);
        toggle.focus();
      }
    });
  }

  function initYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  initMenu();
  initYear();
})();
