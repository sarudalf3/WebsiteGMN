// public/js/modules/nav.js

/**
 * Maneja el menú desplegable en dispositivos móviles
 */
export function initMobileMenu() {
  const menuToggle = document.querySelector('.navbar-toggle'); 
  const navMenu = document.querySelector('.navbar-nav');
  const navLinks = document.querySelectorAll('.nav-links a');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      // Alternamos la clase 'active' que creamos en el CSS
      navMenu.classList.toggle('active');

   // Accesibilidad: cambia de ☰ a X opcionalmente o solo cambia el aria
      const expanded = navMenu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', expanded);
    });

    // Cerrar el menú automáticamente cuando el usuario haga clic en una sección
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
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
  //const navLinks = document.querySelectorAll("#navbar a"); // Usamos el ID del header
  const navLinks = document.querySelectorAll(".navbar-nav a, .nav-links a, header nav a");

  const observerOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px", // Esto crea una "línea de detección" en la parte superior
    threshold: 0 
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          // 1. LIMPIEZA TOTAL: Quitamos active de todos antes de poner el nuevo
          link.classList.remove("active");
          // 2. ASIGNACIÓN: Solo al que coincide con el ID actual
          const href = link.getAttribute("href");
          if (href === `#${id}` || href.endsWith(`#${id}`)) {
            link.classList.add("active");
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach((section) => observer.observe(section));
} 