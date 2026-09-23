/* Anwar Cement Sheet – site scripts */
(function () {
  'use strict';

  /* ---------- Hero carousel ---------- */
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dotsWrap = document.getElementById('heroDots');
  const progress = document.getElementById('heroProgress');
  const DURATION = 2500;
  let index = Math.max(0, slides.findIndex(s => s.classList.contains('is-active')));
  let timer = null;

  if (slides.length) {
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Slide ' + (i + 1));
      b.addEventListener('click', () => go(i, true));
      dotsWrap.appendChild(b);
    });
    const dots = Array.from(dotsWrap.children);

    function render() {
      slides.forEach((s, i) => s.classList.toggle('is-active', i === index));
      dots.forEach((d, i) => d.classList.toggle('is-active', i === index));
      // restart progress bar
      progress.classList.remove('run');
      void progress.offsetWidth;
      progress.style.setProperty('--dur', DURATION + 'ms');
      progress.classList.add('run');
    }
    function go(i, manual) {
      index = (i + slides.length) % slides.length;
      render();
      if (manual) restart();
    }
    function restart() {
      clearInterval(timer);
      timer = setInterval(() => go(index + 1), DURATION);
    }

    document.getElementById('heroPrev').addEventListener('click', () => go(index - 1, true));
    document.getElementById('heroNext').addEventListener('click', () => go(index + 1, true));

    // keeps cycling continuously (no pause on hover); pause only when the tab is hidden
    const hero = document.querySelector('.hero');
    document.addEventListener('visibilitychange', () => { if (document.hidden) clearInterval(timer); else restart(); });

    // touch swipe
    let x0 = null;
    hero.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', e => {
      if (x0 === null) return;
      const dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1, true);
      x0 = null;
    });

    // keyboard
    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') go(index - 1, true);
      if (e.key === 'ArrowRight') go(index + 1, true);
    });

    render();
    restart();
  }

  /* ---------- Mobile nav ---------- */
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navlinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open);
    });
    links.addEventListener('click', e => {
      if (e.target.tagName === 'A') { links.classList.remove('is-open'); toggle.setAttribute('aria-expanded', 'false'); }
    });
  }

  /* ---------- Active nav link on scroll (home page: links carry data-spy="#section") ---------- */
  const navAnchors = links ? Array.from(links.querySelectorAll('a[data-spy]')) : [];
  const sections = navAnchors.map(a => document.querySelector(a.dataset.spy)).filter(Boolean);
  if (sections.length) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting) navAnchors.forEach(a => a.classList.toggle('is-current', a.dataset.spy === '#' + en.target.id));
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => spy.observe(s));
  }

  /* ---------- Roof finder: tabs + coverflow ---------- */
  const finder = [
    { key: 'home', label: 'Residential home', title: 'Residential Home',
      text: 'Cooler rooms in summer, less rain noise in monsoon and a roof that lasts for decades. The right choice for family homes.',
      image: 'assets/cat-residential.jpg', page: 'residential.html' },
    { key: 'farm', label: 'Animal husbandry', title: 'Animal Husbandry',
      text: 'A cooler, drier and quieter shed that lowers heat stress, so cattle and poultry stay calm and productive.',
      image: 'assets/cat-farm.jpg', page: 'farm.html' },
    { key: 'industrial', label: 'Industrial building', title: 'Industrial Building',
      text: 'Long spans, fire resistance and consistent factory quality for warehouses, workshops and factories.',
      image: 'assets/cat-industrial.jpg', page: 'industrial.html' }
  ];
  const stage = document.getElementById('cfStage');
  const tabs = Array.from(document.querySelectorAll('.tab'));
  let cfIndex = Math.max(0, finder.findIndex(f => f.key === (document.querySelector('.tab.is-active') || {}).dataset?.type));
  if (stage) {

  stage.innerHTML = finder.map((d, i) =>
    '<article class="cf-card" data-i="' + i + '">' +
      '<div class="cf-img" style="background-image:url(\'' + d.image + '\')" role="img" aria-label="' + d.label + '" data-detail="' + d.key + '"></div>' +
      '<div class="cf-body"><h3>' + d.title + '</h3><p>' + d.text + '</p>' +
        '<div class="actions">' +
          '<a href="' + d.page + '" class="btn btn-outline" data-detail="' + d.key + '">Learn More</a>' +
          '<a href="#contact" class="btn btn-primary" data-quote-open="' + d.key + '">Get Quote</a>' +
        '</div></div>' +
    '</article>').join('');
  const cards = Array.from(stage.children);

  function setFinder(i) {
    cfIndex = (i + finder.length) % finder.length;
    const n = finder.length;
    cards.forEach((c, j) => {
      c.classList.remove('is-center', 'is-left', 'is-right');
      if (j === cfIndex) c.classList.add('is-center');
      else if (j === (cfIndex + n - 1) % n) c.classList.add('is-left');
      else c.classList.add('is-right');
    });
    tabs.forEach(t => {
      const on = t.dataset.type === finder[cfIndex].key;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
    });
  }
  cards.forEach(c => c.addEventListener('click', e => {
    if (c.classList.contains('is-center')) return;   // modals.js handles detail / quote clicks on the center card
    e.preventDefault(); e.stopPropagation();
    setFinder(+c.dataset.i);
  }, true));
  tabs.forEach(t => t.addEventListener('click', () => setFinder(finder.findIndex(f => f.key === t.dataset.type))));
  document.getElementById('cfPrev').addEventListener('click', () => setFinder(cfIndex - 1));
  document.getElementById('cfNext').addEventListener('click', () => setFinder(cfIndex + 1));
  // touch swipe on the stage
  let sx = null;
  stage.addEventListener('touchstart', e => { sx = e.touches[0].clientX; }, { passive: true });
  stage.addEventListener('touchend', e => {
    if (sx === null) return;
    const dx = e.changedTouches[0].clientX - sx;
    if (Math.abs(dx) > 50) setFinder(dx < 0 ? cfIndex + 1 : cfIndex - 1);
    sx = null;
  });
  setFinder(cfIndex);
  }

  /* ---------- Get Quote: preselect roof type in contact form ---------- */
  const typeSelect = document.querySelector('#contactForm select[name="type"]');
  function preselect(label) {
    if (!typeSelect || !label) return;
    Array.from(typeSelect.options).forEach(o => { if (o.text === label) typeSelect.value = o.value; });
  }
  preselect(new URLSearchParams(location.search).get('type'));

  /* ---------- Counters ---------- */
  const counters = document.querySelectorAll('[data-count]');
  const countObs = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      const el = en.target, target = +el.dataset.count, start = performance.now();
      const step = now => {
        const p = Math.min((now - start) / 1400, 1);
        el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countObs.unobserve(el);
    });
  }, { threshold: .5 });
  counters.forEach(c => countObs.observe(c));

  /* ---------- Site-wide directional reveal (data-anim-scope / data-anim) ---------- */
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-anim-scope]').forEach(scope => {
    const items = scope.querySelectorAll('[data-anim]');
    let freeze = null;
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        scope.classList.toggle('in-view', en.isIntersecting);
        clearTimeout(freeze);
        if (en.isIntersecting) freeze = setTimeout(() => items.forEach(el => el.classList.add('is-done')), reduceMotion ? 0 : 1800);
        else items.forEach(el => el.classList.remove('is-done'));
      });
    }, { threshold: .12 }).observe(scope);
    scope.addEventListener('animationend', e => {
      if (e.target.hasAttribute('data-anim') && /^a(Left|Right|Up|Down|Pop)$/.test(e.animationName)) e.target.classList.add('is-done');
    });
  });

  /* ---------- Why section: directional reveal + parallax ---------- */
  const why = document.getElementById('why');
  if (why) {
    const animated = why.querySelectorAll('.climate-card, .benefit, .weather > div');
    const whyObs = new IntersectionObserver(entries => {
      entries.forEach(en => {
        why.classList.toggle('in-view', en.isIntersecting);
        if (!en.isIntersecting) animated.forEach(el => el.classList.remove('is-done'));
      });
    }, { threshold: .18 });
    whyObs.observe(why);
    // once an element's entrance animation finishes, freeze it in its final state so hover
    // effects use transitions instead of restarting the entrance animation on mouse-out
    why.addEventListener('animationend', e => {
      if (['whyLeft', 'whyRight', 'tilePop'].includes(e.animationName)) e.target.classList.add('is-done');
    });
    // fallback: freeze everything shortly after the longest entrance animation would have finished
    // (covers reduced-motion users, where no animation runs, and any missed animationend event)
    let freezeTimer = null;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    new IntersectionObserver(entries => {
      entries.forEach(en => {
        clearTimeout(freezeTimer);
        if (en.isIntersecting) freezeTimer = setTimeout(() => animated.forEach(el => el.classList.add('is-done')), reduce ? 0 : 1900);
      });
    }, { threshold: .18 }).observe(why);

    const climate = why.querySelector('.climate-card');
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    if (climate && fine) {
      let raf = null;
      climate.addEventListener('mousemove', e => {
        const r = climate.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5;
        const y = (e.clientY - r.top) / r.height - .5;
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          climate.style.setProperty('--rx', (-y * 4).toFixed(2) + 'deg');
          climate.style.setProperty('--ry', (x * 6).toFixed(2) + 'deg');
          climate.style.setProperty('--gx', (50 + x * 40).toFixed(1) + '%');
          climate.style.setProperty('--gy', (50 + y * 40).toFixed(1) + '%');
        });
      });
      climate.addEventListener('mouseleave', () => {
        climate.style.setProperty('--rx', '0deg'); climate.style.setProperty('--ry', '0deg');
      });
    }
  }

  /* ---------- Back to top ---------- */
  const toTop = document.getElementById('toTop');
  const waWidget = document.querySelector('.wa-widget');
  window.addEventListener('scroll', () => {
    const show = window.scrollY > 600;
    if (toTop) toTop.classList.toggle('is-visible', show);
    if (waWidget) waWidget.classList.toggle('is-lifted', show);
  }, { passive: true });
  if (toTop) toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---------- Contact form (demo) ---------- */
  const form = document.getElementById('contactForm');
  if (form) form.addEventListener('submit', e => {
    e.preventDefault();
    const note = document.getElementById('formNote');
    if (!form.name.value.trim() || !form.phone.value.trim()) {
      note.style.color = '#c0181f';
      note.textContent = 'Please enter your name and phone number.';
      return;
    }
    note.style.color = '#1f7a3f';
    note.textContent = 'Thank you! A dealer will contact you shortly. (Demo – connect to backend/email later.)';
    form.reset();
  });

  document.querySelectorAll('#year').forEach(y => { y.textContent = new Date().getFullYear(); });

  /* ---------- Sheet estimator (find-your-roof page) ---------- */
  const est = document.getElementById('estimator');
  if (est) {
    const out = document.getElementById('estResult');
    const calc = () => {
      const L = parseFloat(est.length.value), W = parseFloat(est.width.value);
      const sheetFt = parseFloat(est.sheet.value), cover = parseFloat(est.cover.value) || 1;
      if (!(L > 0 && W > 0)) { out.innerHTML = '<p class="est-hint">Enter the roof length and width to see an estimate.</p>'; return; }
      const sheetM = sheetFt * 0.3048 * 0.92;                 // usable length after ~150–200 mm end overlap
      const rows = Math.ceil(W / sheetM), cols = Math.ceil(L / cover);
      const n = rows * cols, withWaste = Math.ceil(n * 1.1);
      out.innerHTML = '<div class="est-num"><b>' + n + '</b><span>sheets of ' + sheetFt + ' RFT</span></div>' +
        '<div class="est-num"><b>' + withWaste + '</b><span>with 10% cutting allowance</span></div>' +
        '<div class="est-num"><b>' + rows + ' × ' + cols + '</b><span>rows down the slope × sheets across</span></div>' +
        '<p class="est-hint">Estimate only. It assumes a single-slope area of ' + L + ' m × ' + W + ' m, side overlap of one corrugation and end overlap of 150–200 mm. Ridge panels and accessories are extra. Your dealer will confirm the exact quantity from the roof drawing.</p>';
    };
    est.addEventListener('input', calc); est.addEventListener('change', calc); calc();
  }

  /* ---------- FAQ accordion (support page) ---------- */
  document.querySelectorAll('.faq-q').forEach(q => q.addEventListener('click', () => {
    const item = q.parentElement, open = item.classList.contains('is-open');
    document.querySelectorAll('.faq-item.is-open').forEach(i => { i.classList.remove('is-open'); i.querySelector('.faq-q').setAttribute('aria-expanded', 'false'); });
    if (!open) { item.classList.add('is-open'); q.setAttribute('aria-expanded', 'true'); }
  }));
})();

/* ---------- Sheet colour picker ---------- */
(function () {
  function hex(c) {
    c = c.trim();
    let m = c.match(/^#([0-9a-f]{6})$/i);
    if (m) return [parseInt(m[1].slice(0, 2), 16), parseInt(m[1].slice(2, 4), 16), parseInt(m[1].slice(4, 6), 16)];
    m = c.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);
    return m ? [+m[1], +m[2], +m[3]] : [179, 49, 47];
  }
  function mix(a, b, t) {
    return 'rgb(' + a.map((x, i) => Math.round(x + (b[i] - x) * t)).join(',') + ')';
  }
  const roof = document.getElementById('products');
  const name = document.getElementById('roofColorName');
  const label = document.getElementById('swatchName');
  if (!roof) return;
  document.querySelectorAll('.swatch').forEach(btn => {
    btn.addEventListener('click', () => {
      if (btn.classList.contains('is-active')) return;
      document.querySelectorAll('.swatch').forEach(b => b.classList.remove('is-active', 'rippling'));
      btn.classList.add('is-active');
      void btn.offsetWidth; btn.classList.add('rippling');
      // JS crossfade: each visual blends from its current colour to the new one (staggered), so the
      // in-between colours are clearly visible and it works in every browser
      const target = hex(btn.dataset.color);
      const visuals = roof.querySelectorAll('.roof-visual, .pcard-visual');
      let pending = visuals.length;
      visuals.forEach((v, i) => {
        const from = hex(v.style.getPropertyValue('--roof') || roof.style.getPropertyValue('--roof') || '#b3312f');
        v.style.setProperty('--roof', mix(from, target, 0));           // pin the start colour before the first frame
        if (v._fade) cancelAnimationFrame(v._fade);
        const t0 = performance.now() + 120 * i;                          // stagger: big box first, then each card
        const step = now => {
          const p = Math.min(Math.max((now - t0) / 1300, 0), 1);
          const e = p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;   // ease-in-out
          v.style.setProperty('--roof', mix(from, target, e));
          if (p < 1) v._fade = requestAnimationFrame(step);
          else if (--pending === 0) roof.style.setProperty('--roof', btn.dataset.color);
        };
        v._fade = requestAnimationFrame(step);
      });
      name.style.opacity = 0;
      setTimeout(() => { name.textContent = '– ' + btn.dataset.name; name.style.opacity = ''; }, 300);
      label.textContent = btn.dataset.name;
    });
  });
})();
