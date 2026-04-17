# GMN Group - Corporate Website (Redo)

Este repositorio contiene el rediseño y desarrollo técnico de la plataforma web de **GMN Group**, especialistas con más de 15 años en la gestión de equipos para la gran minería en el norte de Chile.

El proyecto se enfoca en la modernización de la interfaz de usuario (UI), la optimización del rendimiento y la implementación de un sistema robusto de internacionalización.

## 🚀 Tecnologías y Características

- **Arquitectura:** HTML5, CSS3 Moderno (Custom Properties, Flexbox, CSS Grid) y JavaScript ES6+.
- **Sistema Multi-idioma:** Implementación de un módulo de traducción dinámico (`i18n.js`) basado en archivos JSON.
- **Componentes Avanzados:**
  - Carrusel infinito con lógica de centrado automático para logos de clientes.
  - Acordeones responsivos para la sección de servicios.
  - Hero section con soporte de video optimizado para dispositivos iOS (iPhone).
- **Enfoque en Datos:** Estructura optimizada para la visualización de métricas de productividad y casos de éxito.

## 📁 Estructura del Proyecto

```text
├── index.html          # Estructura principal
├── css/                # Estilos divididos por componentes
├── js/                 # Lógica del sitio
│   ├── main.js         # Orquestador principal
│   └── modules/        # Módulos (carousel.js, i18n.js, etc.)
├── lang/               # Diccionarios de idiomas (ES/EN)
├── img/                # Archivos imagenes
└── video/              # Archivo videos