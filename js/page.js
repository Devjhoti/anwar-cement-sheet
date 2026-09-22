/* Anwar Cement Sheet – detail page scripts */
(function () {
  'use strict';
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
  }
  const targets = document.querySelectorAll('.benefit, .detail-side, .ticks li');
  targets.forEach(el => el.classList.add('reveal'));
  const obs = new IntersectionObserver(entries => {
    entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
  }, { threshold: .12 });
  targets.forEach(el => obs.observe(el));
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
