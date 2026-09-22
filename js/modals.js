/* Anwar Cement Sheet – product detail & quotation modals */
(function () {
  'use strict';

  const A = 'fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" aria-hidden="true"';
  const I = {
    check: '<svg ' + A + '><path d="M20 6 9 17l-5-5"/></svg>',
    close: '<svg ' + A + '><path d="M18 6 6 18M6 6l12 12"/></svg>',
    download: '<svg ' + A + '><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>',
    phone: '<svg ' + A + '><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.9 2z"/></svg>',
    layers: '<svg ' + A + '><path d="m12 2 9 5-9 5-9-5 9-5z"/><path d="m3 12 9 5 9-5"/><path d="m3 17 9 5 9-5"/></svg>',
    ruler: '<svg ' + A + '><path d="M21 6H3v12h18z"/><path d="M7 6v4M11 6v3M15 6v4M19 6v3"/></svg>',
    palette: '<svg ' + A + '><circle cx="12" cy="12" r="10"/><circle cx="8" cy="10" r="1.3"/><circle cx="12" cy="7" r="1.3"/><circle cx="16" cy="10" r="1.3"/><path d="M12 22a3 3 0 0 0 0-6h-1a2 2 0 0 1 0-4"/></svg>',
    thick: '<svg ' + A + '><path d="M3 8h18M3 16h18"/><path d="M12 8v8"/><path d="m9 11 3-3 3 3M9 13l3 3 3-3"/></svg>',
    shield: '<svg ' + A + '><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>',
    temp: '<svg ' + A + '><path d="M14 14.8V5a2 2 0 0 0-4 0v9.8a4 4 0 1 0 4 0z"/></svg>',
    flask: '<svg ' + A + '><path d="M9 3h6M10 3v6L4 20a1 1 0 0 0 .9 1.5h14.2A1 1 0 0 0 20 20l-6-11V3"/></svg>',
    sound: '<svg ' + A + '><path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7M19 5a9 9 0 0 1 0 14"/></svg>',
    drop: '<svg ' + A + '><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.3-4-4-6.5c-.7 2.5-2 4.9-4 6.5S5 13 5 15a7 7 0 0 0 7 7z"/></svg>',
    fire: '<svg ' + A + '><path d="M12 2c2 3 6 5.5 6 11a6 6 0 0 1-12 0c0-2.5 1-4.5 2-6 0 2 1 3 2 3 0-3 1-5 2-8z"/></svg>',
    home: '<svg ' + A + '><path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
    cow: '<svg ' + A + '><path d="M4 8c-1.5 0-2.5-1.2-2.5-2.5M20 8c1.5 0 2.5-1.2 2.5-2.5"/><path d="M6 8h12l1 6a7 7 0 0 1-14 0z"/><path d="M9 17h6"/><circle cx="9.5" cy="12" r="1"/><circle cx="14.5" cy="12" r="1"/></svg>',
    factory: '<svg ' + A + '><path d="M2 20V8l6 4V8l6 4V8l6 4v8Z"/><path d="M17 4h2v6h-2z"/></svg>',
    pin: '<svg ' + A + '><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/></svg>'
  };

  const CATALOGUE = 'assets/Anwar-Cement-Sheet-Catalogue.pdf';
  const HOTLINE = '+880 1XXX-XXXXXX';

  /* Shared product facts (from Anwar Group product page) */
  const SPECS = [
    ['thick', 'Thickness', '4 mm'],
    ['ruler', 'Available sizes', '2, 3, 4, 5, 6, 7, 8, 9, 10 RFT'],
    ['layers', 'Construction', '6-layered cement sheet'],
    ['palette', 'Colours', 'Natural Grey · Red · Blue · Green']
  ];
  const ADVANTAGES = [
    ['shield', 'Rust, rot & corrosion free', 'No metal to rust, no wood to rot. Ideal for humid and coastal areas.'],
    ['layers', '6-layered cement sheet', 'Multi-layer construction for strength and long service life.'],
    ['temp', 'Up to 12°C cooler', 'Lower heat transfer keeps interiors noticeably cooler in summer.'],
    ['flask', 'Resistant to chemical attacks', 'Unaffected by ammonia, fertiliser fumes and industrial vapours.'],
    ['sound', 'Noise & thermal insulation', 'Dense sheet dampens rain noise and stabilises indoor temperature.'],
    ['drop', 'Reduced condensation', 'Vapour-permeable, so moisture escapes instead of dripping.'],
    ['fire', 'Fire resistance up to 1200°C', 'Non-combustible material for safer homes and workplaces.']
  ];

  const PRODUCTS = {
    home: {
      key: 'home', icon: 'home', label: 'Residential home', title: 'Anwar Cement Sheet for Homes',
      product: 'Anwar Colored Cement Sheet', image: 'assets/cat-residential.jpg',
      lead: 'A cooler, quieter and longer-lasting roof for family homes. Available in natural grey and three colours to match any house.',
      uses: ['Main house roofing', 'Veranda & porch cover', 'Kitchen & store sheds', 'Boundary wall caps', 'Extension rooms'],
      where: ['Village and semi-urban homes', 'Coastal and riverside areas (rust-free)', 'Hot districts where heat is a concern', 'Rebuilding after storms and floods'],
      chips: ['Family comfort', 'Colour choice', 'Low maintenance', '30+ year life']
    },
    farm: {
      key: 'farm', icon: 'cow', label: 'Animal husbandry', title: 'Anwar Cement Sheet for Farms',
      product: 'Anwar Cement Sheet', image: 'assets/cat-farm.jpg',
      lead: 'Lower shed temperature, no condensation drip and no corrosion from ammonia. A calmer environment for cattle, poultry and goats.',
      uses: ['Dairy & cattle sheds', 'Broiler and layer poultry houses', 'Goat and sheep sheds', 'Feed and hay storage', 'Hatchery buildings'],
      where: ['Commercial dairy farms', 'Poultry farms in hot regions', 'Village homestead sheds', 'Fish-farm service buildings'],
      chips: ['Heat-stress control', 'Ammonia resistant', 'No drip', 'Quiet in rain']
    },
    industrial: {
      key: 'industrial', icon: 'factory', label: 'Industrial building', title: 'Anwar Cement Sheet for Industry',
      product: 'Anwar Cement Sheet', image: 'assets/cat-industrial.jpg',
      lead: 'Fire-resistant, chemical-resistant roofing for long spans and hard use. Consistent factory quality with bulk supply and project support.',
      uses: ['Warehouses & godowns', 'Factory and workshop sheds', 'Rice mills and brick fields', 'Markets, bazaars and shops', 'Schools, mosques and community halls'],
      where: ['Industrial zones and EPZs', 'Agro-processing plants', 'Construction site camps', 'Cold-storage service areas'],
      chips: ['Fire safe to 1200°C', 'Bulk supply', 'Long spans', 'Project support']
    }
  };

  const DISTRICTS = ['Bagerhat','Bandarban','Barguna','Barishal','Bhola','Bogura','Brahmanbaria','Chandpur','Chapainawabganj','Chattogram','Chuadanga',"Cox's Bazar",'Cumilla','Dhaka','Dinajpur','Faridpur','Feni','Gaibandha','Gazipur','Gopalganj','Habiganj','Jamalpur','Jashore','Jhalokathi','Jhenaidah','Joypurhat','Khagrachhari','Khulna','Kishoreganj','Kurigram','Kushtia','Lakshmipur','Lalmonirhat','Madaripur','Magura','Manikganj','Meherpur','Moulvibazar','Munshiganj','Mymensingh','Naogaon','Narail','Narayanganj','Narsingdi','Natore','Netrokona','Nilphamari','Noakhali','Pabna','Panchagarh','Patuakhali','Pirojpur','Rajbari','Rajshahi','Rangamati','Rangpur','Satkhira','Shariatpur','Sherpur','Sirajganj','Sunamganj','Sylhet','Tangail','Thakurgaon'];

  /* ---------- modal shell ---------- */
  const root = document.createElement('div');
  root.className = 'modal-root';
  root.innerHTML = '<div class="modal-backdrop"></div><div class="modal" role="dialog" aria-modal="true"><button class="modal-close" aria-label="Close">' + I.close + '</button><div class="modal-body"></div></div>';
  document.body.appendChild(root);
  const backdrop = root.querySelector('.modal-backdrop');
  const modal = root.querySelector('.modal');
  const body = root.querySelector('.modal-body');
  let lastFocus = null;

  function open(html, cls) {
    lastFocus = document.activeElement;
    modal.className = 'modal ' + (cls || '');
    body.innerHTML = html;
    body.scrollTop = 0;
    root.classList.add('is-open');
    document.documentElement.classList.add('modal-open');
    setTimeout(() => { const f = modal.querySelector('input, select, a.btn, button.btn'); if (f) f.focus({ preventScroll: true }); }, 350);
  }
  function close() {
    root.classList.remove('is-open');
    document.documentElement.classList.remove('modal-open');
    setTimeout(() => { if (!root.classList.contains('is-open')) body.innerHTML = ''; }, 400);
    if (lastFocus && lastFocus.focus) lastFocus.focus({ preventScroll: true });
  }
  function swap(html, cls) {
    modal.classList.add('is-swapping');
    setTimeout(() => { modal.className = 'modal ' + (cls || ''); body.innerHTML = html; body.scrollTop = 0; }, 220);
  }
  backdrop.addEventListener('click', close);
  root.querySelector('.modal-close').addEventListener('click', close);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && root.classList.contains('is-open')) close(); });

  /* ---------- product detail ---------- */
  function detailHTML(p) {
    return '' +
      '<div class="pd">' +
        '<aside class="pd-side">' +
          '<div class="pd-img" style="background-image:url(\'' + p.image + '\')" role="img" aria-label="' + p.product + '"></div>' +
          '<div class="pd-chips">' + p.chips.map(c => '<span>' + c + '</span>').join('') + '</div>' +
          '<div class="pd-hotline"><span class="pd-hot-ico">' + I.phone + '</span><div><small>Talk to a dealer</small><b>' + HOTLINE + '</b></div></div>' +
        '</aside>' +
        '<div class="pd-main">' +
          '<span class="pd-badge"><span class="pd-badge-ico">' + I[p.icon] + '</span>' + p.label + '</span>' +
          '<h2>' + p.title + '</h2>' +
          '<p class="pd-lead">' + p.lead + '</p>' +

          '<h4 class="pd-h">Product description</h4>' +
          '<div class="pd-specs">' + SPECS.map(s =>
            '<div class="pd-spec"><span class="pd-spec-ico">' + I[s[0]] + '</span><small>' + s[1] + '</small><b>' + s[2] + '</b></div>').join('') + '</div>' +

          '<h4 class="pd-h">Advantages</h4>' +
          '<div class="pd-adv">' + ADVANTAGES.map(a =>
            '<div class="pd-adv-item"><span class="pd-adv-ico">' + I[a[0]] + '</span><div><strong>' + a[1] + '</strong><span>' + a[2] + '</span></div></div>').join('') + '</div>' +

          '<div class="pd-two">' +
            '<div><h4 class="pd-h">What it is used for</h4><ul class="pd-list">' + p.uses.map(u => '<li><span class="tick">' + I.check + '</span>' + u + '</li>').join('') + '</ul></div>' +
            '<div><h4 class="pd-h">Where it is used</h4><ul class="pd-list">' + p.where.map(u => '<li><span class="tick tick-pin">' + I.pin + '</span>' + u + '</li>').join('') + '</ul></div>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="modal-foot">' +
        '<a class="btn btn-outline" href="' + CATALOGUE + '" download>' + I.download + ' Download Catalogue</a>' +
        '<button class="btn btn-primary" data-quote-open="' + p.key + '">Get Quote</button>' +
      '</div>';
  }

  /* ---------- quotation form ---------- */
  function field(label, name, type, opts) {
    opts = opts || {};
    const req = opts.required ? ' <i>*</i>' : '';
    let ctrl;
    if (type === 'select') {
      ctrl = '<select name="' + name + '"' + (opts.required ? ' required' : '') + '>' + opts.options.map(o => '<option' + (o === opts.value ? ' selected' : '') + (o.startsWith('Select') ? ' value=""' : '') + '>' + o + '</option>').join('') + '</select>';
    } else if (type === 'textarea') {
      ctrl = '<textarea name="' + name + '" rows="3" placeholder="' + (opts.placeholder || '') + '"></textarea>';
    } else {
      ctrl = '<input type="' + type + '" name="' + name + '" placeholder="' + (opts.placeholder || '') + '"' + (opts.required ? ' required' : '') + (opts.value ? ' value="' + opts.value + '"' : '') + (opts.min ? ' min="' + opts.min + '"' : '') + '>';
    }
    return '<label class="qf-field' + (opts.full ? ' full' : '') + '"><span>' + label + req + '</span>' + ctrl + '</label>';
  }
  function quoteHTML(p) {
    const sizes = ['Select size', '2 RFT', '3 RFT', '4 RFT', '5 RFT', '6 RFT', '7 RFT', '8 RFT', '9 RFT', '10 RFT'];
    return '' +
      '<div class="qf">' +
        '<aside class="qf-side">' +
          '<div class="qf-img" style="background-image:url(\'' + p.image + '\')" role="img" aria-label="' + p.product + '"></div>' +
          '<div class="qf-side-body">' +
            '<small class="qf-cat">' + p.label + '</small>' +
            '<h3>' + p.product + '</h3>' +
            '<ul class="qf-trust">' +
              '<li><span class="tick">' + I.check + '</span>Free dealer consultation</li>' +
              '<li><span class="tick">' + I.check + '</span>Response within 24 hours</li>' +
              '<li><span class="tick">' + I.check + '</span>Trained installer network</li>' +
            '</ul>' +
            '<div class="pd-hotline"><span class="pd-hot-ico">' + I.phone + '</span><div><small>Hotline</small><b>' + HOTLINE + '</b></div></div>' +
          '</div>' +
        '</aside>' +
        '<form class="qf-form" id="quoteForm" novalidate>' +
          '<div class="qf-head">' +
            '<h2>Request a <em>Quotation</em></h2>' +
            '<p>Submit your requirements for an exact estimation.</p>' +
            '<a class="btn btn-outline btn-sm" href="' + CATALOGUE + '" download>' + I.download + ' Download Catalogue</a>' +
          '</div>' +
          '<section class="qf-sec">' +
            '<h3><b>01.</b> Product Information</h3>' +
            '<div class="qf-grid">' +
              field('Product name', 'product', 'select', { full: true, required: true, value: p.product, options: ['Anwar Cement Sheet', 'Anwar Colored Cement Sheet'] }) +
              field('Size (RFT)', 'size', 'select', { required: true, options: sizes }) +
              field('Colour', 'colour', 'select', { options: ['Select colour', 'Natural Grey', 'Red', 'Blue', 'Green'] }) +
              field('Quantity (pcs)', 'qty', 'number', { placeholder: 'Enter pieces', min: 1 }) +
              field('Roof type', 'type', 'select', { value: p.label, options: ['Residential home', 'Animal husbandry', 'Industrial building'] }) +
              field('Additional products', 'extra', 'textarea', { full: true, placeholder: 'Product name, size, quantity (e.g. ridge panel, hook bolts)' }) +
            '</div>' +
          '</section>' +
          '<section class="qf-sec">' +
            '<h3><b>02.</b> Contact Information</h3>' +
            '<div class="qf-grid">' +
              field('Business name', 'business', 'text', { placeholder: 'Business name (optional)' }) +
              field('Full name', 'name', 'text', { placeholder: 'Full name', required: true }) +
              field('Email address', 'email', 'email', { placeholder: 'Enter your email' }) +
              field('Mobile number', 'phone', 'tel', { placeholder: '01XXX-XXXXXX', required: true }) +
              field('Address', 'address', 'text', { full: true, placeholder: 'Village / road, area' }) +
              field('Police station', 'thana', 'text', { placeholder: 'Enter police station' }) +
              field('District', 'district', 'select', { options: ['Select district'].concat(DISTRICTS) }) +
              field('Message', 'message', 'textarea', { full: true, placeholder: 'Roof size, expected delivery time, anything else' }) +
            '</div>' +
          '</section>' +
          '<div class="qf-actions">' +
            '<p class="qf-note" id="quoteNote"></p>' +
            '<button type="submit" class="btn btn-primary btn-lg">Send Quotation Request</button>' +
          '</div>' +
        '</form>' +
      '</div>';
  }
  function successHTML(name) {
    return '<div class="qf-success">' +
      '<div class="qf-check"><svg viewBox="0 0 52 52"><circle cx="26" cy="26" r="24"/><path d="M14 27l8 8 16-16"/></svg></div>' +
      '<h2>Thank you' + (name ? ', ' + name : '') + '!</h2>' +
      '<p>Your quotation request has been received. A dealer from your district will contact you within 24 hours.</p>' +
      '<div class="actions"><a class="btn btn-outline" href="' + CATALOGUE + '" download>' + I.download + ' Download Catalogue</a><button class="btn btn-primary" data-modal-close>Back to website</button></div>' +
      '<small>Demo form – connect to email or CRM before launch.</small>' +
    '</div>';
  }

  function openDetail(key) { const p = PRODUCTS[key]; if (p) open(detailHTML(p), 'modal-detail'); }
  function openQuote(key) {
    const p = PRODUCTS[key] || PRODUCTS.home;
    if (root.classList.contains('is-open')) swap(quoteHTML(p), 'modal-quote'); else open(quoteHTML(p), 'modal-quote');
  }

  /* ---------- delegation ---------- */
  document.addEventListener('click', e => {
    const d = e.target.closest('[data-detail]');
    if (d) { e.preventDefault(); openDetail(d.dataset.detail); return; }
    const q = e.target.closest('[data-quote-open]');
    if (q) { e.preventDefault(); openQuote(q.dataset.quoteOpen); return; }
    if (e.target.closest('[data-modal-close]')) { e.preventDefault(); close(); }
  });
  document.addEventListener('submit', e => {
    const form = e.target.closest('#quoteForm');
    if (!form) return;
    e.preventDefault();
    const note = form.querySelector('#quoteNote');
    const bad = Array.from(form.querySelectorAll('[required]')).filter(el => !el.value.trim());
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    if (bad.length) {
      bad.forEach(el => el.closest('.qf-field').classList.add('is-invalid'));
      note.textContent = 'Please fill in the required fields marked with *.';
      bad[0].focus();
      return;
    }
    const name = form.name.value.trim().split(' ')[0];
    swap(successHTML(name), 'modal-quote modal-success');
  });

  /* Deep link: index.html?type=Animal%20husbandry → open quote modal */
  const t = new URLSearchParams(location.search).get('type');
  if (t) {
    const hit = Object.values(PRODUCTS).find(p => p.label.toLowerCase() === t.toLowerCase());
    if (hit) setTimeout(() => openQuote(hit.key), 400);
  }

  window.AnwarModals = { openDetail, openQuote, close };
})();
