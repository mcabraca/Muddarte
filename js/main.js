/* =======================================================
   MUDDARTE – JavaScript principal
   - Hero slider
   - Galería dinámica + lightbox
   - Menú móvil
   - Navbar scroll effect
   - Active nav link on scroll
   - Año dinámico en footer
   ======================================================= */

/* -------------------------------------------------------
   GALERÍA
   Para agregar imágenes: agrega un objeto al array con
   { src: 'images/gallery/nombre.jpg', alt: 'Descripción SEO' }
   El archivo debe existir en /images/gallery/
   ------------------------------------------------------- */
const galleryImages = [
  {
    src: 'images/gallery/vestido-dama.png',
    alt: 'Vestido de dama confeccionado a medida – Muddarte Costa Rica'
  },
  {
    src: 'images/gallery/vestido-2.png',
    alt: 'Vestido elegante confeccionado por Muddarte – costura en Costa Rica'
  },
  {
    src: 'images/gallery/blusa-1.jpeg',
    alt: 'Blusa personalizada confeccionada a medida – Muddarte Limón Costa Rica'
  },
  {
    src: 'images/gallery/traje-navidad.jpeg',
    alt: 'Traje de Navidad confeccionado a medida – Muddarte Costa Rica'
  },
  {
    src: 'images/gallery/traje-ninna.png',
    alt: 'Vestido confeccionado para niña – sastrería y costura en Costa Rica'
  },
  {
    src: 'images/gallery/traje-ninna-2.jpeg',
    alt: 'Traje elegante para niña – confección a medida Muddarte'
  },
  {
    src: 'images/gallery/traje-cocinera.png',
    alt: 'Traje formal para cocinera – confección a medida Muddarte Limon Costa Rica'
  }
];


/* -------------------------------------------------------
   HERO SLIDER
   Imágenes desde /images/home/ – cambiar rutas aquí si
   se agregan o renombran imágenes del hero
   ------------------------------------------------------- */
const heroImages = [
  {
    src: 'images/home/vestido-3.jpeg',
    alt: 'Confección de vestido personalizado – Muddarte Limón Costa Rica'
  },
   {
    src: 'images/home/vestido-1.png',
    alt: 'Confección de vestido personalizado – Muddarte Limón Costa Rica'
  },
  {
    src: 'images/home/traje-ninno.png',
    alt: 'Confección de traje para niño – Muddarte Costa Rica'
  },
  {
    src: 'images/home/trajes-banno.png',
    alt: 'Trajes de baño confeccionados a medida – Muddarte Costa Rica'
  }
];


/* -------------------------------------------------------
   INICIALIZACIÓN
   ------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initHeroSlider();
  initGallery();
  initMobileMenu();
  initNavScroll();
  initActiveNavLinks();
});


/* Año dinámico en el footer */
function initYear() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
}


/* -------------------------------------------------------
   HERO SLIDER
   ------------------------------------------------------- */
function initHeroSlider() {
  const sliderEl = document.getElementById('heroSlider');
  const dotsEl = document.getElementById('heroDots');
  if (!sliderEl || !dotsEl || heroImages.length === 0) return;

  let current = 0;
  let timer = null;

  /* Crear slides */
  heroImages.forEach((img, i) => {
    const slide = document.createElement('div');
    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');

    const image = document.createElement('img');
    image.src = img.src;
    image.alt = img.alt;
    image.loading = i === 0 ? 'eager' : 'lazy';

    slide.appendChild(image);
    sliderEl.appendChild(slide);
  });

  /* Crear dots */
  heroImages.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', `Imagen ${i + 1} de ${heroImages.length}`);
    dot.addEventListener('click', () => goTo(i));
    dotsEl.appendChild(dot);
  });

  const slides = sliderEl.querySelectorAll('.hero-slide');
  const dots = dotsEl.querySelectorAll('.hero-dot');

  function goTo(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % heroImages.length);
  }

  /* Avance automático cada 5 segundos */
  function startTimer() {
    timer = setInterval(next, 5000);
  }

  function stopTimer() {
    clearInterval(timer);
  }

  startTimer();

  /* Pausar al hover */
  sliderEl.addEventListener('mouseenter', stopTimer);
  sliderEl.addEventListener('mouseleave', startTimer);
}


/* -------------------------------------------------------
   GALERÍA DINÁMICA + LIGHTBOX CON NAVEGACIÓN
   ------------------------------------------------------- */
function initGallery() {
  const grid = document.getElementById('galleryGrid');
  if (!grid) return;

  /* Render de items */
  galleryImages.forEach((img, i) => {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    item.setAttribute('role', 'listitem');
    item.setAttribute('tabindex', '0');
    item.setAttribute('aria-label', `Ver imagen: ${img.alt}`);

    item.innerHTML = `
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
      <div class="gallery-overlay" aria-hidden="true">
        <span>Ver imagen</span>
      </div>
    `;

    item.addEventListener('click', () => openLightbox(i));
    item.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openLightbox(i);
      }
    });

    grid.appendChild(item);
  });

  /* Lightbox */
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBg = document.getElementById('lightboxBackdrop');
  const lightboxPrev = document.getElementById('lightboxPrev');
  const lightboxNext = document.getElementById('lightboxNext');
  const lightboxCounter = document.getElementById('lightboxCounter');

  if (!lightbox) return;

  let currentIndex = 0;

  function showImage(index) {
    currentIndex = (index + galleryImages.length) % galleryImages.length;
    lightboxImg.src = galleryImages[currentIndex].src;
    lightboxImg.alt = galleryImages[currentIndex].alt;
    lightboxCounter.textContent = `${currentIndex + 1} / ${galleryImages.length}`;
  }

  function openLightbox(index) {
    showImage(index);
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    lightboxClose.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    lightboxImg.src = '';
  }

  lightboxClose.addEventListener('click', closeLightbox);
  lightboxBg.addEventListener('click', closeLightbox);
  lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
  lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

  document.addEventListener('keydown', e => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
    if (e.key === 'ArrowRight') showImage(currentIndex + 1);
  });
}


/* -------------------------------------------------------
   MENÚ MÓVIL
   ------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('navMenu');
  if (!toggle || !menu) return;

  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.classList.toggle('open', isOpen);
    toggle.setAttribute('aria-expanded', isOpen);
  });

  /* Cerrar al hacer clic en un link */
  menu.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Cerrar al hacer clic fuera */
  document.addEventListener('click', e => {
    if (!toggle.contains(e.target) && !menu.contains(e.target)) {
      menu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/* -------------------------------------------------------
   NAVBAR – SOMBRA AL HACER SCROLL
   ------------------------------------------------------- */
function initNavScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  function onScroll() {
    header.classList.toggle('scrolled', window.scrollY > 10);
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}


/* -------------------------------------------------------
   ACTIVE NAV LINK según la sección visible
   ------------------------------------------------------- */
function initActiveNavLinks() {
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (sections.length === 0 || navLinks.length === 0) return;

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.toggle('active', href === `#${id}`);
          });
        }
      });
    },
    { rootMargin: '-40% 0px -55% 0px' }
  );

  sections.forEach(s => observer.observe(s));
}
