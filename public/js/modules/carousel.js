// public/js/modules/carousel.js
import { getTextFromKey } from './i18n.js';

const carouselData = [
    { id: 1, title: "BHP", key: "exitos.bhp", img: "/img/bhp.webp", img2: "/img/bhp2.webp" },
    { id: 2, title: "Codelco", key: "exitos.codelco", img: "/img/codelco.webp", img2: "/img/codelco2.webp" },
    { id: 3, title: "Cerro Matoso", key: "exitos.cerromatoso", img: "/img/Cerro matoso.webp", img2: "/img/Cerro matoso2.webp" },
    { id: 4, title: "Coca-Cola", key: "exitos.cocacola", img: "/img/cocacola.webp", img2: "/img/cocacola2.webp" },
    { id: 5, title: "Glencore", key: "exitos.glencore", img: "/img/glencore.webp", img2: "/img/glencore2.webp" }
];

let currentIndex = 0;

export function initCarousel() {
    const mainDisplay = document.querySelector('.main-display');
    if (!mainDisplay) return;

    renderCarousel();
    setupControls();
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
                <img src="${item.img}" alt="${item.title}">
                <img src="${item.img2}" alt="${item.title} detail">
            </div>
        </div>
    `;
}

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