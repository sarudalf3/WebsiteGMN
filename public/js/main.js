// public/js/main.js
import { initLanguage, loadLanguage } from './modules/i18n.js';
import { initModal } from './modules/modal.js';
import { initQueHacemosAnimation } from './modules/anim.js';
import { initMobileMenu, handleHeaderScroll, initNavObserver } from './modules/nav.js';

document.addEventListener('DOMContentLoaded', () => {
  // --- Módulo de Navegación ---
  initMobileMenu();
  handleHeaderScroll();
  initNavObserver();

  // --- Módulo de Modales ---
  initModal();

  // --- Módulo de Animaciones Visuales ---
  initQueHacemosAnimation();

  // --- Módulo de Idiomas ---
  initLanguage(() => {
    console.log("GMN Group: Web totalmente cargada y modularizada.");
  });

  // Selector de idioma (UI)
  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.addEventListener("change", (e) => {
      loadLanguage(e.target.value);
    });
  }
});