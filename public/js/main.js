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
        // Al cambiar idioma, i18n ya traduce los data-key automáticamente. 
        // Si tu i18n.js traduce todo el DOM, no necesitas reinicializar el carrusel aquí.
        initCarousel();
    });

    document.getElementById("language-selector")?.addEventListener("change", (e) => {
        loadLanguage(e.target.value, () => initCarousel());
        // i18n debería encargarse de traducir los textos del carrusel sin mover la posición.
    });
});