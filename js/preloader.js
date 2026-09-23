/* Anwar Cement Sheet – cinematic preloader
   Timeline: corrugation lines draw → red light sweep → roof outline strikes → logo rises with dust burst
   → wordmark types on → progress bar completes → curtains part. Sound is synthesized (Web Audio) and
   only plays after a user gesture, per browser autoplay rules. Skipped for repeat visits in the same
   session and for reduced-motion users. */
(function () {
  'use strict';
  const root = document.getElementById('preloader');
  if (!root) return;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const seen = (() => { try { return sessionStorage.getItem('acs-preloaded'); } catch (e) { return null; } })();
  if (reduce || seen) { root.remove(); document.documentElement.classList.remove('is-loading'); return; }
  try { sessionStorage.setItem('acs-preloaded', '1'); } catch (e) {}

  document.documentElement.classList.add('is-loading');
  const canvas = root.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const bar = root.querySelector('.pl-bar span');
  const pct = root.querySelector('.pl-pct');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W, H;
  function size() {
    W = canvas.width = innerWidth * DPR; H = canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
  }
  size(); addEventListener('resize', size);

  /* ---------- synthesized SFX ---------- */
  let ac = null, master = null;
  function audioOn() {
    if (ac) return;
    try {
      ac = new (window.AudioContext || window.webkitAudioContext)();
      master = ac.createGain(); master.gain.value = .35; master.connect(ac.destination);
    } catch (e) { ac = null; }
  }
  function tone(f0, f1, dur, type, vol, t) {
    if (!ac) return;
    const o = ac.createOscillator(), g = ac.createGain(), at = ac.currentTime + (t || 0);
    o.type = type || 'sine'; o.frequency.setValueAtTime(f0, at); o.frequency.exponentialRampToValueAtTime(Math.max(f1, 1), at + dur);
    g.gain.setValueAtTime(0, at); g.gain.linearRampToValueAtTime(vol, at + .01); g.gain.exponentialRampToValueAtTime(.001, at + dur);
    o.connect(g); g.connect(master); o.start(at); o.stop(at + dur + .05);
  }
  function noise(dur, vol, hp, t) {
    if (!ac) return;
    const n = ac.sampleRate * dur, buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0);
    for (let i = 0; i < n; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / n, 2);
    const s = ac.createBufferSource(), g = ac.createGain(), f = ac.createBiquadFilter(), at = ac.currentTime + (t || 0);
    s.buffer = buf; f.type = 'highpass'; f.frequency.value = hp || 800; g.gain.value = vol;
    s.connect(f); f.connect(g); g.connect(master); s.start(at);
  }
  const sfx = {
    tick: () => tone(1800, 1200, .04, 'square', .05),
    sweep: () => { tone(200, 900, .6, 'sawtooth', .08); noise(.6, .12, 2000); },
    strike: () => { tone(90, 40, .35, 'sine', .5); noise(.25, .35, 300); tone(2400, 600, .15, 'triangle', .12); },
    rise: () => tone(300, 620, .7, 'sine', .12),
    type: () => tone(2200, 1800, .03, 'square', .04),
    done: () => { tone(520, 780, .25, 'sine', .15); tone(780, 1040, .35, 'sine', .12, .12); },
    open: () => noise(.7, .2, 400)
  };
  const gestures = ['pointerdown', 'keydown', 'touchstart'];
  const unlock = () => { audioOn(); gestures.forEach(g => removeEventListener(g, unlock)); };
  gestures.forEach(g => addEventListener(g, unlock, { passive: true }));

  /* ---------- scene ---------- */
  const RED = '#eb1d27', RED2 = '#ff5a63';
  const T = { lines: [0, 1.1], sweep: [.9, 1.7], roof: [1.5, 2.3], burst: 2.25, logo: [2.3, 3.1], type: [2.9, 4.0], hold: 4.4, end: 5.1 };
  const particles = [];
  let start = null, lastTick = -1, burstDone = false, typed = 0, finished = false;
  const word1 = 'ANWAR', word2 = 'CEMENT SHEET';
  const logoImg = new Image(); logoImg.src = 'assets/logo-512.png';
  const ease = p => p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2;
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const prog = (t, r) => clamp((t - r[0]) / (r[1] - r[0]), 0, 1);

  function burst(cx, cy) {
    for (let i = 0; i < 140; i++) {
      const a = Math.random() * Math.PI * 2, sp = (Math.random() * 6 + 2) * DPR;
      particles.push({ x: cx, y: cy, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 3 * DPR, life: 1, r: (Math.random() * 2.2 + .6) * DPR, red: Math.random() < .35 });
    }
  }

  function frame(now) {
    if (!start) start = now;
    const t = (now - start) / 1000;
    ctx.clearRect(0, 0, W, H);

    // background vignette
    const g = ctx.createRadialGradient(W / 2, H / 2, 0, W / 2, H / 2, Math.max(W, H) * .7);
    g.addColorStop(0, '#1a1c1b'); g.addColorStop(1, '#070808');
    ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);

    // 1. corrugation lines drawing in (diagonal, like a sheet seen at an angle)
    const pl = ease(prog(t, T.lines));
    const gap = 46 * DPR, n = Math.ceil((W + H) / gap);
    ctx.lineWidth = 1.2 * DPR;
    for (let i = 0; i < n; i++) {
      const d = i / n, show = clamp((pl - d * .6) / .4, 0, 1);
      if (show <= 0) continue;
      const x = i * gap - H * .35;
      ctx.strokeStyle = 'rgba(255,255,255,' + (.035 + .05 * (i % 2)) + ')';
      ctx.beginPath(); ctx.moveTo(x, H); ctx.lineTo(x + H * .35 * show, H - H * show); ctx.stroke();
      const tick = Math.floor(pl * 14);
      if (tick !== lastTick && pl < 1) { lastTick = tick; sfx.tick(); }
    }

    // 2. red light sweep across the sheet
    const ps = prog(t, T.sweep);
    if (ps > 0 && ps < 1) {
      if (ps < .05) sfx.sweep();
      const sx = -W * .3 + (W * 1.6) * ease(ps);
      const sg = ctx.createLinearGradient(sx - W * .18, 0, sx + W * .18, 0);
      sg.addColorStop(0, 'rgba(235,29,39,0)'); sg.addColorStop(.5, 'rgba(235,29,39,.28)'); sg.addColorStop(1, 'rgba(235,29,39,0)');
      ctx.fillStyle = sg; ctx.fillRect(0, 0, W, H);
    }

    // geometry of the roof mark (matches the logo's roof silhouette)
    const cx = W / 2, cy = H / 2 - 30 * DPR, rw = Math.min(W, H) * .30, rh = rw * .42;
    // 3. roof outline strikes in with a glow
    const pr = ease(prog(t, T.roof));
    const outlineAlpha = 1 - ease(prog(t, T.logo)) * .85;
    if (pr > 0) {
      ctx.save(); ctx.globalAlpha = outlineAlpha;
      const pts = [[cx - rw, cy + rh * .5], [cx - rw * .78, cy + rh * .5], [cx, cy - rh * .5], [cx + rw * .78, cy + rh * .5], [cx + rw, cy + rh * .5]];
      let total = 0; const seg = [];
      for (let i = 1; i < pts.length; i++) { const L = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(L); total += L; }
      let remain = total * pr;
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      for (const pass of [[18 * DPR, 'rgba(235,29,39,.18)'], [7 * DPR, 'rgba(255,90,99,.55)'], [3 * DPR, RED]]) {
        ctx.lineWidth = pass[0]; ctx.strokeStyle = pass[1]; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
        let r = remain;
        for (let i = 1; i < pts.length && r > 0; i++) {
          const L = seg[i - 1], f = Math.min(1, r / L);
          ctx.lineTo(pts[i - 1][0] + (pts[i][0] - pts[i - 1][0]) * f, pts[i - 1][1] + (pts[i][1] - pts[i - 1][1]) * f); r -= L;
        }
        ctx.stroke();
      }
      ctx.restore();
    }
    // 4. impact burst when the outline completes
    if (t >= T.burst && !burstDone) { burstDone = true; burst(cx, cy); sfx.strike(); root.classList.add('is-shake'); setTimeout(() => root.classList.remove('is-shake'), 350); }
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i]; p.x += p.vx; p.y += p.vy; p.vy += .18 * DPR; p.vx *= .985; p.life -= .016;
      if (p.life <= 0) { particles.splice(i, 1); continue; }
      ctx.globalAlpha = p.life; ctx.fillStyle = p.red ? RED2 : '#d8d5cc'; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * p.life, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // 5. logo rises through the roof line, outline fades to make room
    const plg = ease(prog(t, T.logo));
    if (plg > 0 && logoImg.complete) {
      if (plg < .04) sfx.rise();
      const lw = rw * 1.25, lh = lw * (logoImg.height / logoImg.width);
      const y = cy - lh * .52 + (1 - plg) * 70 * DPR;
      ctx.save(); ctx.globalAlpha = plg;
      ctx.shadowColor = 'rgba(235,29,39,.55)'; ctx.shadowBlur = 40 * DPR * plg;
      ctx.drawImage(logoImg, cx - lw / 2, y, lw, lh);
      ctx.restore();
    }

    // 6. wordmark types on beneath
    const pt = prog(t, T.type);
    if (pt > 0) {
      const total = word1.length + word2.length, k = Math.floor(pt * total);
      if (k !== typed) { typed = k; sfx.type(); }
      const s1 = word1.slice(0, Math.min(k, word1.length)), s2 = word2.slice(0, Math.max(0, k - word1.length));
      ctx.textAlign = 'center'; ctx.textBaseline = 'top';
      const by = cy + rw * 1.25 * (logoImg.height / logoImg.width) * .48 + rw * .14;
      ctx.fillStyle = RED; ctx.font = '800 ' + Math.round(rw * .26) + 'px Manrope, Arial, sans-serif';
      ctx.fillText(s1, cx, by);
      ctx.fillStyle = '#fff'; ctx.font = '700 ' + Math.round(rw * .11) + 'px Manrope, Arial, sans-serif';
      ctx.save(); ctx.letterSpacing = (rw * .03) + 'px'; ctx.fillText(s2, cx, by + rw * .32); ctx.restore();
      if (k < total && Math.floor(t * 3) % 2 === 0) { ctx.fillStyle = RED2; ctx.fillRect(cx + ctx.measureText(k < word1.length ? s1 : s2).width / 2 + 6 * DPR, k < word1.length ? by : by + rw * .32, 3 * DPR, k < word1.length ? rw * .24 : rw * .1); }
    }

    // progress
    const pp = clamp(t / T.hold, 0, 1);
    bar.style.width = (pp * 100).toFixed(1) + '%';
    pct.textContent = Math.round(pp * 100) + '%';

    if (t >= T.hold && !finished) { finished = true; sfx.done(); setTimeout(reveal, 250); }
    if (!root.classList.contains('is-done')) requestAnimationFrame(frame);
  }

  function reveal() {
    sfx.open();
    root.classList.add('is-done');
    document.documentElement.classList.remove('is-loading');
    document.dispatchEvent(new CustomEvent('preloader:done'));
    setTimeout(() => root.remove(), 1400);
  }

  // skip on click after the first second
  root.addEventListener('click', () => { const t = (performance.now() - (start || performance.now())) / 1000; if (t > 1 && !finished) { finished = true; reveal(); } });

  // start once fonts + logo are ready (cap the wait so the page never hangs)
  const ready = Promise.race([
    Promise.all([document.fonts ? document.fonts.load('800 20px Manrope') : Promise.resolve(), new Promise(r => { logoImg.complete ? r() : (logoImg.onload = r, logoImg.onerror = r); })]),
    new Promise(r => setTimeout(r, 1200))
  ]);
  ready.then(() => requestAnimationFrame(frame));
})();
