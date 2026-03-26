// public/js/main.js
import { initLanguage, loadLanguage } from './modules/i18n.js';
import { initModal } from './modules/modal.js';
import { initNavObserver, initMobileMenu } from './modules/nav.js';
import { initCarousel } from './modules/carousel.js'; // Nuevo

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initNavObserver();
    initModal();
    initCarousel(); // Inicializamos el carrusel

    initLanguage(() => {
        // Al cambiar el idioma, refrescamos el carrusel para que se traduzca
        initCarousel();
    });

    document.getElementById("language-selector")?.addEventListener("change", (e) => {
        loadLanguage(e.target.value, () => initCarousel());
    });
});