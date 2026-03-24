// public/js/modules/nav.js

/**
 * Maneja el menú desplegable en dispositivos móviles
 */
export function initMobileMenu() {
  const menuToggle = document.querySelector('.menu-toggle'); // Asegúrate de que este sea tu selector
  const navMenu = document.querySelector('.navbar');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      navMenu.classList.toggle('navbar--active');
      menuToggle.classList.toggle('is-active');
    });

    // Cerrar menú al hacer clic en un enlace
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('navbar--active');
        menuToggle.classList.remove('is-active');
      });
    });
  }
}

/**
 * Cambia la apariencia del header cuando el usuario hace scroll
 */
export function handleHeaderScroll() {
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('header--scrolled');
    } else {
      header.classList.remove('header--scrolled');
    }
  });
}

/**
 * Observador para resaltar el enlace activo en la navegación
 */
export function initNavObserver() {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar a");

  const observerOptions = {
    threshold: 0.5
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.remove("active");
          if (link.getAttribute("href") === `#${id}`) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
}