// public/js/modules/anim.js

/**
 * Animación específica para la sección "Qué Hacemos"
 */
export function initQueHacemosAnimation() {
  const section = document.getElementById('quehacemos-intro');
  if (!section) return;

  const imageColumn = section.querySelector('.image-column');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        imageColumn.classList.add('visible');
        // Dejamos de observar una vez que la animación se dispara
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
  });

  observer.observe(section);
}