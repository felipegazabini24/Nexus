// ===== NEXUS — interactions =====

// ¿El usuario prefiere menos movimiento?
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Año dinámico
document.getElementById('year').textContent = new Date().getFullYear();

// Nav: fondo al hacer scroll
const nav = document.getElementById('nav');
const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

// Reveal on scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (i % 6) * 70 + 'ms';
  io.observe(el);
});

// Contadores animados en el hero
const animateCount = (el) => {
  const target = parseFloat(el.dataset.count);
  const decimals = target % 1 !== 0 ? 1 : 0;
  if (reduceMotion) { el.textContent = target.toFixed(decimals); return; }
  const dur = 1400;
  const start = performance.now();
  const tick = (now) => {
    const p = Math.min((now - start) / dur, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = (target * eased).toFixed(decimals);
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
};
const statObs = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) { animateCount(e.target); statObs.unobserve(e.target); }
  });
}, { threshold: 0.6 });
document.querySelectorAll('[data-count]').forEach((el) => statObs.observe(el));

// Menú móvil: alterna la clase .open (la posición la maneja el CSS)
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
const setMenu = (open) => {
  links.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  toggle.textContent = open ? '✕' : '☰';
};
toggle?.addEventListener('click', () => setMenu(!links.classList.contains('open')));
// Cerrar al tocar un enlace del menú
links?.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Marcas: letras alternadas con el color de cada marca (una pintada, una blanca)
document.querySelectorAll('.brand').forEach((el) => {
  const color = el.dataset.color || '#d4af37';
  const text = el.textContent;
  el.textContent = '';
  let k = 0;
  [...text].forEach((ch) => {
    const s = document.createElement('span');
    s.textContent = ch;
    if (ch !== ' ') {
      s.style.color = k % 2 === 0 ? color : '#f4f4f6';
      k++;
    }
    el.appendChild(s);
  });
});
