// public/js/modules/carousel.js
import { getTextFromKey } from './i18n.js';

const carouselData = [
    { id: 1, title: "exitos.exp_title1", key: "exitos.exp_desc1", logo: "/img/logo01.webp", img: "/img/success01.webp"},
    { id: 2, title: "exitos.exp_title2", key: "exitos.exp_desc2", logo: "/img/logo02.webp", img: "/img/success02.webp"},
    { id: 3, title: "exitos.exp_title3", key: "exitos.exp_desc3", logo: "/img/logo03.webp", img: "/img/success03.webp"},
    { id: 4, title: "exitos.exp_title4", key: "exitos.exp_desc4", logo: "/img/logo04.webp", img: "/img/success04.webp"},
    { id: 5, title: "exitos.exp_title5", key: "exitos.exp_desc5", logo: "/img/logo05.webp", img: "/img/success05.webp"},
    { id: 6, title: "exitos.exp_title6", key: "exitos.exp_desc6", logo: "/img/logo06.webp", img: "/img/success06.webp"},
    { id: 7, title: "exitos.exp_title7", key: "exitos.exp_desc7", logo: "/img/logo07.webp", img: "/img/success07.webp"},
    { id: 8, title: "exitos.exp_title8", key: "exitos.exp_desc8", logo: "/img/logo08.webp", img: "/img/success08.webp"},
];

let currentIndex = 0;
let eventsBound = false; // Variable de control

export function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const nextBtn = document.querySelector('#nextBtn');
    const prevBtn = document.querySelector('#prevBtn');
    
    if (!track || !nextBtn || !prevBtn) return;
    if (eventsBound) return; // Si ya se configuró, no lo hagas de nuevo

    let index = 0;
    const slides = Array.from(track.children);

    nextBtn.addEventListener('click', () => {
        index = (index + 1) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    });

    prevBtn.addEventListener('click', () => {
        index = (index - 1 + slides.length) % slides.length;
        track.style.transform = `translateX(-${index * 100}%)`;
    });

    eventsBound = true; // Marcamos como configurado
}

function renderCarousel() {
    const item = carouselData[currentIndex];
    const mainDisplay = document.querySelector('.main-display');
    
    // Actualizamos el contenido usando las traducciones
    mainDisplay.innerHTML = `
        <div class="carousel-item">
            <div class="carousel-item__info">
                <h3>${item.title}</h3>
                <p>${getTextFromKey(item.key)}</p>
            </div>
            <div class="carousel-item__images">
                <img src="${item.img}" alt="${getTextFromKey(item.title)} detail">
            </div>
        </div>
    `;
}

//line 51                <img src="${item.logo}" alt="${getTextFromKey(item.title)}">

function setupControls() {
    document.querySelector('.prev-btn')?.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? carouselData.length - 1 : currentIndex - 1;
        renderCarousel();
    });

    document.querySelector('.next-btn')?.addEventListener('click', () => {
        currentIndex = (currentIndex === carouselData.length - 1) ? 0 : currentIndex + 1;
        renderCarousel();
    });
}