// public/js/modules/carousel.js
import { getTextFromKey } from './i18n.js';

const successCases = [
    { id: 1, title: "success.exp_title01", desc: "success.exp_desc01", logo: "/img/logo01.png", img: "/img/success01.webp"},
    { id: 2, title: "success.exp_title02", desc: "success.exp_desc02", logo: "/img/logo02.png", img: "/img/success02.webp"},
    { id: 3, title: "success.exp_title03", desc: "success.exp_desc03", logo: "/img/logo03.png", img: "/img/success03.webp"},
    { id: 4, title: "success.exp_title04", desc: "success.exp_desc04", logo: "/img/logo04.png", img: "/img/success04.webp"},
    { id: 5, title: "success.exp_title05", desc: "success.exp_desc05", logo: "/img/logo05.png", img: "/img/success05.webp"},
    { id: 6, title: "success.exp_title06", desc: "success.exp_desc06", logo: "/img/logo06.png", img: "/img/success06.webp"},
    { id: 7, title: "success.exp_title07", desc: "success.exp_desc07", logo: "/img/logo07.png", img: "/img/success07.webp"},
    { id: 8, title: "success.exp_title08", desc: "success.exp_desc08", logo: "/img/logo08.png", img: "/img/success08.webp"},
];

let currentIndex = 0; // Empezamos en 0
let autoPlayTimer = null;

export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const thumbContainer = document.querySelector('.carousel-thumbnails');
    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#prevBtn');

    if (!track || !thumbContainer) return;

    // IMPORTANTE: Limpiar el timer anterior si existe (evita aceleración al cambiar idioma)
    if (autoPlayTimer) clearInterval(autoPlayTimer);

    // Limpieza de contenedores
    track.innerHTML = '';
    thumbContainer.innerHTML = '';

    // 1. Crear Slides Principales
    successCases.forEach((item, index) => {
        // Slide Principal
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            <img src="${item.img}" alt="${getTextFromKey(item.title)}">
            <div class="carousel-caption">
                <h3 data-key="${item.title}">${getTextFromKey(item.title)}</h3>
                <p data-key="${item.desc}">${getTextFromKey(item.desc)}</p>
            </div>
        `;
        track.appendChild(slide);
    });

    // 2. Crear Thumbnails Originales
    successCases.forEach((item, index) => {
        const thumb = document.createElement('div');
        thumb.className = 'thumbnail';
        thumb.setAttribute('data-index', index);
        thumb.innerHTML = `<img src="${item.logo}" alt="Logo ${index}">`;
        thumb.onclick = () => goToSlide(index);
        thumbContainer.appendChild(thumb);
    });

   // 3. Clonación para efecto infinito (Clonamos el set completo para asegurar cobertura)
    const originalThumbs = Array.from(thumbContainer.querySelectorAll('.thumbnail'));
    
    // Clonamos al final
    originalThumbs.forEach(thumb => {
        const clone = thumb.cloneNode(true);
        clone.classList.add('clone');
        clone.onclick = () => goToSlide(parseInt(clone.getAttribute('data-index')));
        thumbContainer.appendChild(clone);
    });    

    // Clonamos al principio (en orden inverso para que queden bien)
    [...originalThumbs].reverse().forEach(thumb => {
        const clone = thumb.cloneNode(true);
        clone.classList.add('clone');
        clone.onclick = () => goToSlide(parseInt(clone.getAttribute('data-index')));
        thumbContainer.insertBefore(clone, thumbContainer.firstChild);
    });

    function goToSlide(index) {
        currentIndex = index;

        // Mover track principal
        track.style.transform = `translateX(-${currentIndex * 100}%)`;

        // Actualizar estado activo en todos (originales y clones)
        const allThumbs = thumbContainer.querySelectorAll('.thumbnail');
        allThumbs.forEach(t => {
            if (parseInt(t.getAttribute('data-index')) === currentIndex) {
                t.classList.add('active');
            } else {
                t.classList.remove('active');
            }
        });

        // --- LÓGICA DE CENTRADO ---
        // Buscamos el thumbnail "original" (el que está en medio de los clones)
        // Los originales ahora empiezan después de la primera tanda de clones
        const targetThumb = originalThumbs[currentIndex];

        if (targetThumb) {
            const containerWidth = thumbContainer.offsetWidth;
            const thumbWidth = targetThumb.offsetWidth;
            const thumbOffset = targetThumb.offsetLeft;

            const scrollAmount = thumbOffset - (containerWidth / 2) + (thumbWidth / 2);

            thumbContainer.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }
        resetAutoPlay();
    }

    // Navegación
    if (nextBtn) nextBtn.onclick = () => goToSlide((currentIndex + 1) % successCases.length);
    if (prevBtn) prevBtn.onclick = () => goToSlide((currentIndex - 1 + successCases.length) % successCases.length);

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            goToSlide((currentIndex + 1) % successCases.length);
        }, 6000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Inicio
    setTimeout(() => goToSlide(0), 100);
    startAutoPlay();
}