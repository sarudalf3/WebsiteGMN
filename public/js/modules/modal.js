// public/js/modules/modal.js
import { getTextFromKey } from './i18n.js';

/**
 * Crea la estructura del modal si no existe en el DOM
 */
function ensureModalExists() {
  let modal = document.getElementById('modal-services');
  if (modal) return modal;

  const modalHTML = `
    <div id="modal-services" class="modal-services" style="display: none;">
      <div class="modal-services__overlay"></div>
      <div class="modal-services__content">
        <button class="modal-services__close" aria-label="Cerrar">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h3 class="modal-services__title"></h3>
        <div class="modal-services__body"></div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML('beforeend', modalHTML);
  return document.getElementById('modal-services');
}

/**
 * Gestiona el foco dentro del modal para accesibilidad (A11y)
 */
function trapFocus(modal) {
  const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  if (focusableElements.length === 0) return;

  const first = focusableElements[0];
  const last = focusableElements[focusableElements.length - 1];

  modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  });
}

/**
 * Abre el modal con la información del servicio seleccionado
 */
export function openServicesModal(servicioElement) {
  const modal = ensureModalExists();
  const titleP5 = servicioElement.querySelector('h3 p5');
  const title = titleP5?.dataset.key ? getTextFromKey(titleP5.dataset.key) : '';

  // Procesar textos visibles y ocultos
  const getTexts = (selector) => {
    return Array.from(servicioElement.querySelectorAll(`${selector} p5`))
      .map(p5 => p5.dataset.key ? getTextFromKey(p5.dataset.key) : '')
      .join('<br><br>');
  };

  modal.querySelector('.modal-services__title').textContent = title;
  modal.querySelector('.modal-services__body').innerHTML = `
    <div class="modal-services__visible-text">${getTexts('.visible-text')}</div>
    <div class="modal-services__hidden-text">${getTexts('.hidden-text')}</div>
  `;

  modal.style.display = 'block';
  requestAnimationFrame(() => modal.classList.add('modal-services--active'));
  document.body.style.overflow = 'hidden';
  trapFocus(modal);
}

/**
 * Cierra el modal
 */
export function closeServicesModal() {
  const modal = document.getElementById('modal-services');
  if (!modal) return;

  modal.classList.remove('modal-services--active');
  setTimeout(() => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  }, 300);
}

/**
 * Inicializa todos los listeners del modal
 */
export function initModal() {
  const modal = ensureModalExists();

  // Delegación de eventos para los botones "Ver más"
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.ver-mas-btn');
    if (btn) {
      const servicio = btn.closest('.servicio');
      if (servicio) openServicesModal(servicio);
    }

    // Cerrar si hace clic en overlay o botón cerrar
    if (e.target.closest('.modal-services__close') || e.target.classList.contains('modal-services__overlay')) {
      closeServicesModal();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeServicesModal();
  });
}