// ===== NEXUS — interactions =====

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

// Menú móvil (simple toggle de los links)
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
toggle?.addEventListener('click', () => {
  const open = links.style.display === 'flex';
  links.style.display = open ? '' : 'flex';
  links.style.cssText += open ? '' : 'position:absolute;top:72px;right:24px;flex-direction:column;background:#101018;padding:20px;border:1px solid rgba(255,255,255,.08);border-radius:14px;';
});

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
