/* ============================================================
   interactions.js — micro-interaction engine (React edition)
   ------------------------------------------------------------
   cursor + ripples + magnetic buttons + card tilt/spotlight
   + ambient dust/meteors/grain + scroll reveals + progress bar
   + hero aurora parallax
   ------------------------------------------------------------
   USAGE (React):
     import { initInteractions } from "./interactions.js";
     // in App():
     useEffect(() => { initInteractions(); }, []);
   Safe with StrictMode double-mount (boot guard inside).
   Optional labels: add data-cursor="DRAG" / "VIEW" attributes
   anywhere in your JSX — the cursor ring shows the word.
   Auto-off: touch devices & prefers-reduced-motion.
   ============================================================ */
let booted = false;

export function initInteractions() {
  if (booted) return;           // StrictMode / double-call guard
  booted = true;

  const FINE    = matchMedia('(pointer:fine)').matches;
  const REDUCED = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const ON = FINE && !REDUCED;

  /* ---------- 1. custom cursor: dot + lagging ring ---------- */
  if (ON) {
    document.body.classList.add('cursor-on');

    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    ring.innerHTML = '<b><span></span></b>';
    document.body.append(dot, ring);
    const label = ring.querySelector('span');

    let x = -100, y = -100, rx = -100, ry = -100;
    dot.style.transform = 'translate(-100px,-100px)';

    addEventListener('pointermove', e => {
      x = e.clientX; y = e.clientY;
      dot.style.transform = `translate(${x}px,${y}px)`;
    }, { passive: true });

    (function follow() {              /* ring lags a little = premium feel */
      rx += (x - rx) * .18;
      ry += (y - ry) * .18;
      ring.style.transform = `translate(${rx}px,${ry}px)`;
      requestAnimationFrame(follow);
    })();

    /* grow over interactive things, show labels from [data-cursor="…"] */
    const HOT = 'a,button,input,select,textarea,.btn,.cb-btn,.pill,[data-cursor]';
    document.addEventListener('pointerover', e => {
      const t = e.target.closest(HOT);
      if (!t) return;
      const lab = t.closest('[data-cursor]');
      if (lab) { label.textContent = lab.dataset.cursor; ring.classList.add('is-label'); }
      else ring.classList.add('is-hover');
    });
    document.addEventListener('pointerout', e => {
      if (!e.target.closest(HOT)) return;
      ring.classList.remove('is-hover', 'is-label');
    });
    addEventListener('pointerdown', () => ring.classList.add('is-press'));
    addEventListener('pointerup',   () => ring.classList.remove('is-press'));

    /* hide when the pointer leaves the window */
    document.documentElement.addEventListener('mouseleave', () => { dot.style.opacity = ring.style.opacity = 0; });
    document.documentElement.addEventListener('mouseenter', () => { dot.style.opacity = ring.style.opacity = ''; });
  }

  /* ---------- 2. click ripple on buttons -------------------- */
  const RIPPLE_HOSTS = '.btn,.cb-btn,.pill,.wa-float,button';
  document.addEventListener('click', e => {
    const host = e.target.closest(RIPPLE_HOSTS);
    if (!host) {
      if (!ON) return;
      const p = document.createElement('span');   /* soft pulse anywhere else */
      p.className = 'page-ripple';
      p.style.left = e.clientX + 'px';
      p.style.top  = e.clientY + 'px';
      document.body.appendChild(p);
      p.addEventListener('animationend', () => p.remove(), { once: true });
      return;
    }
    const r  = host.getBoundingClientRect();
    const cx = e.clientX || (r.left + r.width  / 2);  /* keyboard "clicks" have no coords */
    const cy = e.clientY || (r.top  + r.height / 2);
    const s  = document.createElement('span');
    s.className = 'click-ripple';
    const d  = Math.max(r.width, r.height) * 2.4;
    s.style.width  = s.style.height = d + 'px';
    s.style.left   = (cx - r.left) + 'px';
    s.style.top    = (cy - r.top)  + 'px';
    host.appendChild(s);
    s.addEventListener('animationend', () => s.remove(), { once: true });
  });

  /* ---------- 3. magnetic buttons ---------------------------- */
  if (ON) {
    document.querySelectorAll('.btn,.cb-btn,.pill').forEach(el => {
      el.addEventListener('pointermove', e => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', ((e.clientX - r.left - r.width  / 2) * .22).toFixed(1) + 'px');
        el.style.setProperty('--my', ((e.clientY - r.top  - r.height / 2) * .3 ).toFixed(1) + 'px');
      });
      el.addEventListener('pointerleave', () => {
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      });
    });
  }

  /* ---------- 4. cards: spotlight + 3D tilt ------------------ */
  if (ON) {
    document.querySelectorAll('.svc,.proj,.edu,.quote,.fit,.exp-card').forEach(card => {
      card.classList.add('tilt');
      card.addEventListener('pointermove', e => {
        const r  = card.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width  - .5;
        const py = (e.clientY - r.top)  / r.height - .5;
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');   /* spotlight */
        card.style.setProperty('--my', (e.clientY - r.top)  + 'px');
        card.style.setProperty('--ry', ( px * 9).toFixed(2) + 'deg');  /* tilt */
        card.style.setProperty('--rx', (-py * 9).toFixed(2) + 'deg');
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--rx', '0deg');
        card.style.setProperty('--ry', '0deg');
      });
    });
  }

  /* ---------- 5. ambient background: dust + meteors + grain -- */
  if (!REDUCED) {
    const cv = document.createElement('canvas');
    cv.className = 'ambient';
    cv.setAttribute('aria-hidden', 'true');
    document.body.appendChild(cv);
    const cx = cv.getContext('2d');

    const COLORS = ['232,176,74', '232,176,74', '61,219,176', '234,243,240'];
    let W, H, parts = [], bokeh = [], meteor = null, nextMeteor = performance.now() + 2600;
    let mx = .5, my = .5, smx = .5, smy = .5;    /* mouse parallax (raw + smoothed) */

    const makeBokeh = () => Array.from({ length: 7 }, () => ({   /* soft light haze */
      x: Math.random() * W, y: Math.random() * H,
      r: 55 + Math.random() * 95,
      vx: (Math.random() - .5) * .14, vy: (Math.random() - .5) * .12,
      c: Math.random() < .5 ? '61,219,176' : '232,176,74',
      a: .03 + Math.random() * .035,
      ph: Math.random() * Math.PI * 2
    }));

    const spawn = fromBottom => ({
      x: Math.random() * W,
      y: fromBottom ? H + 12 : Math.random() * H,
      r: .6 + Math.random() * 1.7,
      d: .25 + Math.random() * .75,              /* depth → parallax amount */
      vy: .08 + Math.random() * .3,
      sway: .3 + Math.random() * .9,
      ph: Math.random() * Math.PI * 2,
      tw: .4 + Math.random() * 1.6,              /* twinkle speed */
      a: .18 + Math.random() * .4,
      c: COLORS[Math.random() * COLORS.length | 0]
    });

    const resize = () => {
      const DPR = Math.min(devicePixelRatio || 1, 2);
      W = innerWidth; H = innerHeight;
      cv.width = W * DPR; cv.height = H * DPR;
      cv.style.width = W + 'px'; cv.style.height = H + 'px';
      cx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const n = Math.min(90, Math.round(W * H / 16000));
      parts = Array.from({ length: n }, () => spawn(false));
      bokeh = makeBokeh();
    };
    addEventListener('resize', resize, { passive: true });
    addEventListener('pointermove', e => { mx = e.clientX / W; my = e.clientY / H; }, { passive: true });
    resize();

    (function draw(now) {
      requestAnimationFrame(draw);
      const t = now / 1000;
      smx += (mx - smx) * .04; smy += (my - smy) * .04;
      cx.clearRect(0, 0, W, H);
      const ox = (smx - .5) * 26, oy = (smy - .5) * 18;   /* parallax offset */

      for (const b of bokeh) {                             /* soft bokeh haze */
        b.x += b.vx; b.y += b.vy;
        if (b.x < -b.r) b.x = W + b.r; else if (b.x > W + b.r) b.x = -b.r;
        if (b.y < -b.r) b.y = H + b.r; else if (b.y > H + b.r) b.y = -b.r;
        const bx = b.x + ox * 1.5, by = b.y + oy * 1.2;
        const g = cx.createRadialGradient(bx, by, 0, bx, by, b.r);
        const a = b.a * (.7 + .3 * Math.sin(t * .35 + b.ph));
        g.addColorStop(0, `rgba(${b.c},${a.toFixed(3)})`);
        g.addColorStop(1, `rgba(${b.c},0)`);
        cx.fillStyle = g;
        cx.beginPath();
        cx.arc(bx, by, b.r, 0, 6.2832);
        cx.fill();
      }

      for (const p of parts) {                             /* floating dust */
        p.y -= p.vy;
        if (p.y < -14) Object.assign(p, spawn(true));
        const x = p.x + Math.sin(t * p.sway + p.ph) * 14 + ox * p.d;
        const y = p.y + oy * p.d;
        const a = p.a * (.55 + .45 * Math.sin(t * p.tw + p.ph));
        cx.beginPath();
        cx.arc(x, y, p.r, 0, 6.2832);
        cx.fillStyle = `rgba(${p.c},${a.toFixed(3)})`;
        cx.fill();
      }

      if (!meteor && now > nextMeteor) {                   /* shooting star */
        const dir = Math.random() < .5 ? 1 : -1;
        meteor = { x: W * (.15 + Math.random() * .7), y: -20,
                   vx: dir * (5 + Math.random() * 3), vy: 3.5 + Math.random() * 2,
                   life: 0, max: 70 + Math.random() * 30 };
      }
      if (meteor) {
        meteor.x += meteor.vx; meteor.y += meteor.vy; meteor.life++;
        const k = 1 - meteor.life / meteor.max;
        const g = cx.createLinearGradient(meteor.x, meteor.y, meteor.x - meteor.vx * 9, meteor.y - meteor.vy * 9);
        g.addColorStop(0, `rgba(234,243,240,${(.75 * k).toFixed(3)})`);
        g.addColorStop(1, 'rgba(234,243,240,0)');
        cx.strokeStyle = g; cx.lineWidth = 1.4; cx.lineCap = 'round';
        cx.beginPath();
        cx.moveTo(meteor.x, meteor.y);
        cx.lineTo(meteor.x - meteor.vx * 9, meteor.y - meteor.vy * 9);
        cx.stroke();
        if (meteor.life >= meteor.max || meteor.y > H + 40) {
          meteor = null;
          nextMeteor = now + 3500 + Math.random() * 6000;
        }
      }
    })(performance.now());

    /* film grain — the texture that makes it feel expensive */
    const grain = document.createElement('div');
    grain.className = 'grain';
    grain.setAttribute('aria-hidden', 'true');
    grain.style.backgroundImage = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='160' height='160' filter='url(%23n)' opacity='.5'/></svg>")`;
    document.body.appendChild(grain);
  }

  /* ---------- 6. scroll-reveal entrances --------------------- */
  if (!REDUCED && 'IntersectionObserver' in window) {
    const sel = '.wrap>h2,.exp-title,.lede,.frame,.svc,.proj,.edu,.quote,.fit,.exp-card,.node,.step,.contact,.story p,.calc-box,.result';
    const els = document.querySelectorAll(sel);
    const groups = new Map();                    /* stagger within each parent */
    els.forEach(el => {
      el.classList.add('reveal');
      const i = groups.get(el.parentElement) || 0;
      groups.set(el.parentElement, i + 1);
      el.style.setProperty('--rd', Math.min(i * 90, 540) + 'ms');
    });
    const io = new IntersectionObserver(entries => {
      for (const en of entries) if (en.isIntersecting) {
        en.target.classList.add('in');
        io.unobserve(en.target);
      }
    }, { threshold: .1, rootMargin: '0px 0px -8% 0px' });
    els.forEach(el => io.observe(el));
  }

  /* ---------- 7. scroll progress bar -------------------------- */
  const prog = document.createElement('div');
  prog.className = 'scroll-progress';
  prog.setAttribute('aria-hidden', 'true');
  prog.innerHTML = '<i></i>';
  document.body.appendChild(prog);
  const progFill = prog.firstChild;
  let progTick = false;
  const progUpdate = () => {
    const d = document.documentElement;
    const p = d.scrollTop / Math.max(1, d.scrollHeight - d.clientHeight);
    progFill.style.transform = 'scaleX(' + (p > 1 ? 1 : p) + ')';
    progTick = false;
  };
  addEventListener('scroll', () => {
    if (!progTick) { progTick = true; requestAnimationFrame(progUpdate); }
  }, { passive: true });
  addEventListener('resize', progUpdate, { passive: true });
  progUpdate();

  /* ---------- 8. hero aurora parallax ------------------------- */
  if (ON) {
    const hero = document.querySelector('.hero');
    if (hero) {
      hero.addEventListener('pointermove', e => {
        const r = hero.getBoundingClientRect();
        hero.style.setProperty('--px', ((e.clientX - r.left) / r.width  - .5).toFixed(3));
        hero.style.setProperty('--py', ((e.clientY - r.top)  / r.height - .5).toFixed(3));
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        hero.style.setProperty('--px', '0');
        hero.style.setProperty('--py', '0');
      });
    }
  }

  /* ---------- 9. nav scroll-spy -------------------------------- */
  const navAnchors = [...document.querySelectorAll('nav .links a[href^="#"]:not(.pill)')];
  if (navAnchors.length && 'IntersectionObserver' in window) {
    const links = new Map();                       /* section → nav link */
    navAnchors.forEach(a => {
      const sec = document.querySelector(a.getAttribute('href'));
      if (sec) links.set(sec, a);
    });
    const spy = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        navAnchors.forEach(a => a.classList.remove('active'));
        links.get(en.target).classList.add('active');
      });
    }, { rootMargin: '-40% 0px -55% 0px' });       /* middle band of the viewport */
    links.forEach((a, sec) => spy.observe(sec));
  }
}
