// public/js/modules/carousel.js
import { getTextFromKey } from './i18n.js';

// 1. Datos de los casos de éxito (Puedes mover esto a un JSON si prefieres)
const successCases = [
    { id: 1, title: "exitos.exp_title01", desc: "exitos.exp_desc01", logo: "/img/logo01.webp", img: "/img/success01.webp"},
    { id: 2, title: "exitos.exp_title02", desc: "exitos.exp_desc02", logo: "/img/logo02.webp", img: "/img/success02.webp"},
    { id: 3, title: "exitos.exp_title03", desc: "exitos.exp_desc03", logo: "/img/logo03.webp", img: "/img/success03.webp"},
    { id: 4, title: "exitos.exp_title04", desc: "exitos.exp_desc04", logo: "/img/logo04.webp", img: "/img/success04.webp"},
    { id: 5, title: "exitos.exp_title05", desc: "exitos.exp_desc05", logo: "/img/logo05.webp", img: "/img/success05.webp"},
    { id: 6, title: "exitos.exp_title06", desc: "exitos.exp_desc06", logo: "/img/logo06.webp", img: "/img/success06.webp"},
    { id: 7, title: "exitos.exp_title07", desc: "exitos.exp_desc07", logo: "/img/logo07.webp", img: "/img/success07.webp"},
    { id: 8, title: "exitos.exp_title08", desc: "exitos.exp_desc08", logo: "/img/logo08.webp", img: "/img/success08.webp"},
];

/*let eventsBound = false;*/
let currentIndex = 0;
let autoPlayTimer;

// 2. Función para generar el HTML dinámicamente
/*
function renderCarouselItems(track) {
    track.innerHTML = ''; // Limpiamos el track manual

    successCases.forEach(item => {
        const itemHTML = `
            <div class="carousel-item">
                <img src="${item.img}" alt="${getTextFromKey(`${item.title}`)}">
                <div class="carousel-caption">
                    <h3 data-key="${item.title}">${getTextFromKey(`${item.title}`)}</h3>
                    <p data-key="${item.desc}">${getTextFromKey(`${item.desc}`)}</p>
                </div>
            </div>
        `;
        track.insertAdjacentHTML('beforeend', itemHTML);
    });
}*/

function renderCarousel(track, thumbContainer) {
    track.innerHTML = '';
    thumbContainer.innerHTML = '';

    successCases.forEach((item, index) => {
        // Crear Slide Grande
        const slideHTML = `
            <div class="carousel-item">
                <img src="${item.img}" alt="${getTextFromKey(`${item.title}`)}">
                <div class="carousel-caption">
                    <h3 data-key="${item.title}">${getTextFromKey(`${item.title}`)}</h3>
                    <p data-key="${item.desc}">${getTextFromKey(`${item.desc}`)}</p>
                </div>
            </div>`;
        track.insertAdjacentHTML('beforeend', slideHTML);

        // Crear Miniatura
        const thumbHTML = `
            <div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${item.id}">
                <img src="${item.logo}" alt="${getTextFromKey(`${item.title}`)}">
            </div>`;
        thumbContainer.insertAdjacentHTML('beforeend', thumbHTML);
    });
};

// 3. Función principal de inicialización
/*export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#prevBtn');
    
    if (!track || !nextBtn || !prevBtn) return;

    // A. Generamos el contenido dinámico
    renderCarouselItems(track);
    
    // Ahora que existen, los buscamos
    const slides = Array.from(track.children);
    if (slides.length === 0) return;

    let currentIndex = 0;
    const intervalTime = 7000; // 7 segundos (corporativo)

    // B. Lógica de movimiento
    const updateSlide = (index) => {
        track.style.transform = `translateX(-${index * 100}%)`;
        currentIndex = index;
    };

    // C. Funciones para botones
    const handleNext = () => {
        let nextIndex = (currentIndex + 1) % slides.length;
        updateSlide(nextIndex);
        resetAutoPlay(); // Resetea el timer si el usuario hace clic
    };

    const handlePrev = () => {
        let prevIndex = (currentIndex - 1 + slides.length) % slides.length;
        updateSlide(prevIndex);
        resetAutoPlay();
    };

    // D. Auto-play y gestión de timer
    function startAutoPlay() {
        autoPlayTimer = setInterval(handleNext, intervalTime);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay(); // Reinicia el ciclo
    }

    // E. Vinculación de eventos (solo una vez)
    if (!eventsBound) {
        nextBtn.addEventListener('click', handleNext);
        prevBtn.addEventListener('click', handlePrev);
        eventsBound = true;
    }

    // F. Arrancamos el carrusel
    updateSlide(0);
    startAutoPlay();
}*/

export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const thumbContainer = document.querySelector('.carousel-thumbnails');
    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#prevBtn');

// SEGURIDAD: Si no encuentra los elementos, no sigue y evita el error en consola
    if (!track || !thumbContainer) {
        console.warn("Contenedores del carrusel no encontrados");
        return;
    }

    // LIMPIEZA INICIAL para evitar duplicados
    track.innerHTML = '';
    thumbContainer.innerHTML = '';

    // RENDERIZADO ORDENADO (Garantiza el orden 0, 1, 2, 3...)
    successCases.forEach((item, index) => {
        // Slide Principal
        const slide = document.createElement('div');
        slide.className = 'carousel-item';
        slide.innerHTML = `
            <img src="${item.img}" alt="${getTextFromKey(`${item.title}`)}">
            <div class="carousel-caption">
                <h3 data-key="${item.id}">${getTextFromKey(`${item.title}`)}</h3>
                <p data-key="${item.id}">${getTextFromKey(`${item.desc}`)}</p>
            </div>
        `;
        track.appendChild(slide);

        // Miniatura
        const thumb = document.createElement('div');
        thumb.className = `thumbnail ${index === 0 ? 'active' : ''}`;
        thumb.innerHTML = `<img src="${item.logo}" alt="${getTextFromKey(`${item.title}`)}" style="object-fit: contain; width: 100%; height: 100%;">`;
        thumb.onclick = () => goToSlide(index);
        thumbContainer.appendChild(thumb);
    });

    const thumbs = thumbContainer.querySelectorAll('.thumbnail');

    function goToSlide(index) {
        currentIndex = index;
        
        // Movimiento suave del carril
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Actualizar estado de miniaturas
        thumbs.forEach(t => t.classList.remove('active'));
        thumbs[currentIndex].classList.add('active');
        
        resetAutoPlay();
    }

    // Vinculamos botones si existen
    if (nextBtn) nextBtn.onclick = () => goToSlide((currentIndex + 1) % successCases.length);
    if (prevBtn) prevBtn.onclick = () => goToSlide((currentIndex - 1 + successCases.length) % successCases.length);

    function startAutoPlay() {
        autoPlayTimer = setInterval(() => {
            let next = (currentIndex + 1) % successCases.length;
            goToSlide(next);
        }, 7000);
    }

    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    // Iniciar
    startAutoPlay();
}