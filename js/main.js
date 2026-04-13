// public/js/main.js
import { initLanguage, loadLanguage } from './modules/i18n.js';
import { initNavObserver, initMobileMenu } from './modules/nav.js';
import { initCarousel } from './modules/carousel.js'; // Nuevo

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavObserver();
    initCarousel(); // Inicializamos el carrusel

    initLanguage(() => {
        // Al cambiar idioma, i18n ya traduce los data-key automáticamente. 
        // Si tu i18n.js traduce todo el DOM, no necesitas reinicializar el carrusel aquí.
        initCarousel();
    });
    // --- INICIO SCROLLSPY ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.navbar a');

    window.addEventListener('scroll', () => {
        let currentId = "";
        const scrollPosition = window.scrollY + 200; // Offset para detectar la sección antes de llegar arriba

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            // Verificamos que el href coincida con el ID de la sección actual
            if (link.getAttribute('href') === `#${currentId}`) {
                link.classList.add('active');
            }
        });
    });
    // --- FIN SCROLLSPY ---
});



document.getElementById("language-selector")?.addEventListener("change", (e) => {
    loadLanguage(e.target.value, () => {
        // Callback: Cuando carga el idioma, re-renderizamos el carrusel con los nuevos textos
        initCarousel(); 
    });
});

(function () {
  const accordion = document.querySelector(".accordion");
  if (!accordion) return;

  const items = Array.from(accordion.querySelectorAll(".accordion-item"));

  items.forEach(item => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      const isActive = item.classList.contains("active");

      // Close all others
      items.forEach(i => {
        i.classList.remove("active");
        const h = i.querySelector(".accordion-header");
        if (h) h.setAttribute("aria-expanded", "false");
      });

      // Toggle this one
      if (!isActive) {
        item.classList.add("active");
        header.setAttribute("aria-expanded", "true");
      }
    });

    // Keyboard accessibility (Enter or Space)
    header.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        header.click();
      }
    });
  });
})();

