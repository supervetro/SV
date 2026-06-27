const galleryData = [
    {
        id: 'portas',
        label: 'Portas',
        images: [
            { file: 'Porta Robusta Amadeirado com Vidrp.jpg', title: 'Porta Robusta Amadeirado' },
            { file: 'Porta Minimalista.jpg', title: 'Porta Minimalista' },
            { file: 'Porta Marmorizada com LAD.jpg', title: 'Porta Marmorizada' },
            { file: 'Port C Minimal.jpg', title: 'Porta Correr Minimalista' },
            { file: 'POarta de Correr MInalista.jpg', title: 'Porta de Correr Minimalista' },
            { file: 'P R A C V.jpg', title: 'Porta' },
            { file: 'P A.jpg', title: 'Porta' },
            { file: 'Fonte nova POrta e correr Minalista.jpg', title: 'Porta de Correr Minimalista' },
        ]
    },
    {
        id: 'janelas',
        label: 'Janelas',
        images: [
            { file: 'Janela de correr só vidro.JPG', title: 'Janela de Correr' },
            { file: 'janela de correr só vidro vista.jpg', title: 'Janela de Correr — Vista' },
            { file: 'J A.jpg', title: 'Janela' },
        ]
    },
    {
        id: 'guarda-corpos',
        label: 'Guarda Corpos',
        images: [
            { file: 'Guarda Corpo Vista.jpg', title: 'Guarda Corpo' },
            { file: 'Guarda Corpo Luxo.jpg', title: 'Guarda Corpo Luxo' },
            { file: 'G C L.jpg', title: 'Guarda Corpo' },
            { file: 'Fonte Nova Instal Guarda corpo.jpg', title: 'Guarda Corpo' },
        ]
    },
    {
        id: 'fachadas',
        label: 'Fachadas',
        images: [
            { file: 'Fachada Muxarabi.jpg', title: 'Fachada Muxarabi' },
            { file: 'Fachada Galpão.png', title: 'Fachada Galpão' },
            { file: 'Fachada de Loja.jpg', title: 'Fachada Comercial' },
            { file: 'F A.jpg', title: 'Fachada' },
        ]
    },
    {
        id: 'espelhos',
        label: 'Espelhos',
        images: [
            { file: 'Espelho sem forma.jpg', title: 'Espelho Orgânico' },
            { file: 'Espelho retandular com LaD.jpg', title: 'Espelho Retangular com LED' },
            { file: 'Espelho Redondo com Led.jpg', title: 'Espelho Redondo com LED' },
            { file: 'espelho pateleira.JPG', title: 'Espelho com Prateleira' },
            { file: 'Espelho oval com led.jpg', title: 'Espelho Oval com LED' },
            { file: 'Espelho modular.jpg', title: 'Espelho Modular' },
        ]
    },
    {
        id: 'box',
        label: 'Box',
        images: [
            { file: 'Box.JPG', title: 'Box de Vidro' },
            { file: 'Box acabamento Inox.jpg', title: 'Box Acabamento Inox' },
            { file: 'Box 2 portas entrada de quina.jpg', title: 'Box 2 Portas — Entrada Quina' },
        ]
    },
    {
        id: 'instalacoes',
        label: 'Instalações',
        images: [
            { file: 'Fonte Nova Instal.jpg', title: 'Instalação' },
        ]
    }
];

let currentCategory = 'todas';
let currentImages = [];
let lightboxIndex = -1;

function getImgPath(file) {
    return 'assets/Galeria/' + encodeURI(file);
}

function renderFilter() {
    const container = document.getElementById('galleryNavFilter');
    let html = '<button class="nav-filter-pill active" data-category="todas">Todas</button>';
    galleryData.forEach(cat => {
        html += `<button class="nav-filter-pill" data-category="${cat.id}">${cat.label}</button>`;
    });
    container.innerHTML = html;
    container.querySelectorAll('.nav-filter-pill').forEach(btn => {
        btn.addEventListener('click', () => {
            container.querySelectorAll('.nav-filter-pill').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGallery(btn.dataset.category);
        });
    });
}

function filterGallery(category) {
    currentCategory = category;
    const grid = document.getElementById('galleryGrid');
    const cards = grid.querySelectorAll('.gallery-card');
    let images = [];
    if (category === 'todas') {
        galleryData.forEach(cat => images = images.concat(cat.images.map(img => ({ ...img, catId: cat.id, catLabel: cat.label }))));
    } else {
        const cat = galleryData.find(c => c.id === category);
        if (cat) images = cat.images.map(img => ({ ...img, catId: cat.id, catLabel: cat.label }));
    }
    currentImages = images;

    cards.forEach((card, i) => {
        const cat = card.dataset.category;
        if (category === 'todas' || cat === category) {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            card.style.display = 'block';
            requestAnimationFrame(() => {
                card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            });
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.9)';
            setTimeout(() => { card.style.display = 'none'; }, 400);
        }
    });

    setTimeout(() => {
        updateLightboxNav();
    }, 100);
}

function renderGrid() {
    const grid = document.getElementById('galleryGrid');
    let html = '';
    galleryData.forEach(cat => {
        cat.images.forEach((img, idx) => {
            html += `
                <div class="gallery-card" data-category="${cat.id}" data-cat-idx="${idx}" onclick="openLightbox('${cat.id}', ${idx})">
                    <div class="gallery-card-img">
                        <img src="${getImgPath(img.file)}" alt="${img.title}" loading="lazy" />
                    </div>
                    <div class="gallery-card-overlay">
                        <span class="gallery-card-tag">${cat.label}</span>
                        <span class="gallery-card-title">${img.title}</span>
                    </div>
                </div>
            `;
        });
    });
    grid.innerHTML = html;
    currentImages = [];
    galleryData.forEach(cat => {
        cat.images.forEach(img => {
            currentImages.push({ ...img, catId: cat.id, catLabel: cat.label });
        });
    });
    updateLightboxNav();
}

function openLightbox(catId, idx) {
    const cat = galleryData.find(c => c.id === catId);
    if (!cat || !cat.images[idx]) return;
    const img = cat.images[idx];
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    lightboxIndex = currentImages.findIndex(ci => ci.file === img.file && ci.catId === catId);
    lbImg.src = getImgPath(img.file);
    lbImg.alt = img.title;
    lbCap.textContent = `${img.title} — ${cat.label}`;
    lb.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxNav();
}

function closeLightbox() {
    const lb = document.getElementById('lightbox');
    lb.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    if (currentImages.length === 0) return;
    lightboxIndex = (lightboxIndex + dir + currentImages.length) % currentImages.length;
    const img = currentImages[lightboxIndex];
    const lbImg = document.getElementById('lightboxImg');
    const lbCap = document.getElementById('lightboxCaption');
    lbImg.style.opacity = '0';
    setTimeout(() => {
        lbImg.src = getImgPath(img.file);
        lbImg.alt = img.title;
        lbCap.textContent = `${img.title} — ${img.catLabel}`;
        lbImg.style.opacity = '1';
    }, 200);
    updateLightboxNav();
}

function updateLightboxNav() {
    const prev = document.getElementById('lbPrev');
    const next = document.getElementById('lbNext');
    if (currentImages.length <= 1) {
        prev.style.display = 'none';
        next.style.display = 'none';
    } else {
        prev.style.display = 'flex';
        next.style.display = 'flex';
    }
}

document.addEventListener('keydown', (e) => {
    const lb = document.getElementById('lightbox');
    if (!lb.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

document.addEventListener('DOMContentLoaded', () => {
    renderFilter();
    renderGrid();
});
