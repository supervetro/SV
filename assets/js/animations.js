/**
 * --- LÓGICA DE ANIMAÇÕES ---
 * Gerencia Lenis Smooth Scroll e animações GSAP/ScrollTrigger
 */

// --- LENIS SMOOTH SCROLL ---
const initLenis = () => {
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        direction: 'vertical',
        gestureDirection: 'vertical',
        smooth: true,
        mouseMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return lenis;
};

// --- GSAP ANIMATIONS ---
const initAnimations = (lenis) => {
    gsap.registerPlugin(ScrollTrigger);

    // Sincronizar Lenis c/ ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => { lenis.raf(time * 1000) });
    gsap.ticker.lagSmoothing(0);

    // Animações de Entrada (Hero)
    gsap.from(".gsap-hero > *", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.2
    });

    // Parallax na imagem do Hero
    gsap.to("#hero-img img", {
        scale: 1,
        scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // Animações ao Rolar (Fade Up)
    const fadeElements = document.querySelectorAll('.fade-up');
    fadeElements.forEach((el) => {
        gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: el,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });
};

// Inicialização Global
window.addEventListener('DOMContentLoaded', () => {
    const lenisInstance = initLenis();
    initAnimations(lenisInstance);
    window.lenis = lenisInstance; // Expondo para o form-handler
});
