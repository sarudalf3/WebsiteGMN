// public/js/modules/nav.js

/**
 * Maneja el menú desplegable en dispositivos móviles
 */
export function initMobileMenu() {
  const menuToggle = document.querySelector('.navbar-toggle'); 
  const navContainer = document.querySelector('.navbar-nav');

  if (menuToggle && navContainer) {
    menuToggle.addEventListener('click', () => {
      // Alternar clase para mostrar/ocultar menú
      const isActive = navContainer.classList.toggle('navbar--active');
      
      // Accesibilidad
      menuToggle.setAttribute('aria-expanded', isActive);
      
      // Opcional: animación de las barras (hamburguesa a X)
      menuToggle.classList.toggle('is-active');
    });

    // Cerrar el menú automáticamente al hacer clic en un enlace

    const links = navContainer.querySelectorAll('.nav-links a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navContainer.classList.remove('navbar--active');
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