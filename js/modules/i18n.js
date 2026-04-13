// public/js/modules/i18n.js

let currentLanguageData = {};
/**
 * Obtiene un valor del JSON de traducción usando una clave de punto (ej: "misc.vermas")
 */
export function getTextFromKey(key) {
  if (!currentLanguageData) return key;
  
  const parts = key.split(".");
  let value = currentLanguageData;
  for (const p of parts) {
    value = value?.[p];
    if (value === undefined) return key;
  }
  return value || key;
}

/**
 * Carga el archivo JSON y actualiza todos los elementos con [data-key]
 */
export async function loadLanguage(lang, callback) {
  try {
    // Añade la barra inicial / para que siempre busque en la raíz
    const res = await fetch(`lang/${lang}.json`);
    if (!res.ok) throw new Error(`Archivo no encontrado: ${lang}.json`);
    
    currentLanguageData = await res.json();
    localStorage.setItem('preferredLanguage', lang);

    // Traducir elementos estándar
    document.querySelectorAll("[data-key]").forEach(el => {
      const value = getTextFromKey(el.dataset.key);
      if (value) el.textContent = value;
    });

    // Traducir botones con estructura específica
    document.querySelectorAll("button[data-key]").forEach(button => {
      const value = getTextFromKey(button.dataset.key);
      const btnText = button.querySelector('.btn-text');
      if (value && btnText) btnText.textContent = value;
    });

    console.log(`Idioma cargado: ${lang}`);
    
    // Ejecutar callback (por ejemplo, para refrescar los modales)
    if (callback) callback();

  } catch (error) {
    console.error('Error al cargar idioma:', error);
    if (lang !== 'esp') loadLanguage('esp', callback);
  }
}

/**
 * Inicializa el idioma basado en preferencia o navegador
 */
/*export function initLanguage(callback) {
  const savedLang = localStorage.getItem('preferredLanguage');
  const browserLang = navigator.language.split('-')[0];
  const defaultLang = savedLang || (browserLang === 'es' ? 'esp' : 'eng');
  loadLanguage(defaultLang, callback);
}*/

export function initLanguage(callback) {
  // 1. Obtenemos el idioma guardado o usamos 'esp' por defecto
  const savedLang = localStorage.getItem('preferredLanguage') || 'esp';
  
  // 2. BUSCAMOS EL SELECTOR Y SINCRONIZAMOS EL VALOR VISUAL
  const languageSelector = document.getElementById("language-selector");
  if (languageSelector) {
    languageSelector.value = savedLang;
  }

  // 3. Cargamos el idioma
  loadLanguage(savedLang, callback);
}