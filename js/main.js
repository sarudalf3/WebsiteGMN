// public/js/main.js
import { initLanguage, loadLanguage } from './modules/i18n.js';
import { initNavObserver, initMobileMenu } from './modules/nav.js';
import { initCarousel } from './modules/carousel.js'; // Nuevo

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavObserver();
    initCarousel(); // Inicializamos el carrusel

// --- INTEGRACIÓN DEL COUNT-UP ---
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

    function countUp(el) {
        const target = +el.dataset.count, 
              pre = el.dataset.prefix || '', 
              suf = el.dataset.suffix || '';
        
        if (reduce) {
            el.textContent = pre + target.toLocaleString('es') + suf;
            return;
        }
        
        let start = null, dur = 1200;
        
        function step(t) {
            if (!start) start = t;
            const p = Math.min((t - start) / dur, 1);
            const val = Math.floor((1 - Math.pow(1 - p, 3)) * target);
            el.textContent = pre + val.toLocaleString('es') + suf;
            if (p < 1) requestAnimationFrame(step);
        }
        
        requestAnimationFrame(step);
    }

    const cio = new IntersectionObserver((es) => es.forEach(en => {
        if (en.isIntersecting) {
            countUp(en.target);
            cio.unobserve(en.target);
        }
    }), { threshold: .5 });

    document.querySelectorAll('[data-count]').forEach(el => cio.observe(el));
    // ---------------------------------
    initLanguage(() => {
        // Al cambiar idioma, i18n ya traduce los data-key automáticamente. 
        // Si tu i18n.js traduce todo el DOM, no necesitas reinicializar el carrusel aquí.
        initCarousel();
    });
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

