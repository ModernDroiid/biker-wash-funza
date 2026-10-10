/**
 * Comportamiento mínimo del sitio: menú móvil, sección actual en el menú y año del pie de página.
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

  /**
   * Marca en el menú la sección que está en pantalla (aria-current).
   * Una sección se asocia a un enlace por su id o, si pertenece a otra
   * (p. ej. "Mejoras" es parte del club), por data-nav="<id>".
   */
  function initSectionSpy() {
    const links = new Map(
      [...document.querySelectorAll('.header__link[href^="#"]')].map((link) => [link.hash.slice(1), link]),
    );
    const sections = document.querySelectorAll('main > section');
    if (!links.size || !sections.length || !('IntersectionObserver' in window)) return;

    const setCurrent = (key) => {
      links.forEach((link, id) => {
        if (id === key) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    };

    // Franja delgada a media pantalla: la sección que la cruza es la actual.
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const { id, dataset } = entry.target;
          setCurrent(dataset.nav || id);
        });
      },
      { rootMargin: '-45% 0px -54% 0px' },
    );

    sections.forEach((section) => observer.observe(section));
  }

  function initYear() {
    document.querySelectorAll('[data-year]').forEach((el) => {
      el.textContent = String(new Date().getFullYear());
    });
  }

  initMenu();
  initSectionSpy();
  initYear();
})();
