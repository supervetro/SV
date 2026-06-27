/**
 * --- LÓGICA PRINCIPAL (UI/NAVIGATION) ---
 * Gerencia o menu mobile, comportamento do header e dados dinâmicos
 */

// --- DATA DINÂMICA ---
const updateFooterYear = () => {
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
};

// --- COMPORTAMENTO DO HEADER ---
let lastScroll = 0;
const initHeaderScroll = () => {
    const header = document.getElementById('header');
    if (!header) return;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.style.transform = "translateY(0)";
            return;
        }
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = "translateY(-100%)";
        } else {
            header.style.transform = "translateY(0)";
        }
        lastScroll = currentScroll;
    }, { passive: true });
};

// --- MENU MOBILE ---
function toggleMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const btn = document.getElementById('menuToggle');
    if (!nav || !btn) return;

    const isActive = nav.classList.toggle('mobile-active');
    btn.textContent = isActive ? '✕' : '☰';
    
    if (isActive) {
        if (window.lenis) window.lenis.stop();
    } else {
        if (window.lenis) window.lenis.start();
    }
}

const initMobileMenuLogic = () => {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const nav = document.querySelector('.nav-links');
            if (nav && nav.classList.contains('mobile-active')) {
                toggleMobileMenu();
            }
        });
    });
};

// Inicialização
window.addEventListener('DOMContentLoaded', () => {
    updateFooterYear();
    initHeaderScroll();
    initMobileMenuLogic();
});
