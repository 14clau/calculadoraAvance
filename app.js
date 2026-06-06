const CIRC = 2 * Math.PI * 90;
const rp = document.getElementById('rp');
const pd = document.getElementById('pd');
const bf = document.getElementById('bf');
const st = document.getElementById('st');
const rc = document.getElementById('rc');
const rgStops = document.querySelectorAll('#rg stop');

rp.style.strokeDasharray = CIRC;
rp.style.strokeDashoffset = CIRC;

const THEMES = [
  {
    id: 'atardecer',
    name: 'Atardecer en Moraleja',
    emoji: '🌅',
    swatch: ['#ffecd2', '#fcb69f', '#e8c5e5', '#c3b1e1'],
    pageBg: 'linear-gradient(145deg, #ffecd2 0%, #fcb69f 35%, #e8c5e5 70%, #c3b1e1 100%)',
    accent: '#ff6b6b', accent2: '#ffb347', accent3: '#c3b1e1',
    accentRgb: '255, 107, 107',
    cardShadow: 'rgba(200, 90, 80, 0.22)',
    blob1: 'rgba(255, 183, 77, 0.18)', blob2: 'rgba(195, 177, 225, 0.22)',
    formulaBg: 'linear-gradient(135deg, #fff9f0 0%, #fff0f5 100%)',
    formulaBorder: 'rgba(255, 107, 107, 0.12)', formulaLabel: '#d4a0a0',
    ringShadow: 'rgba(255, 107, 107, 0.28)',
    progress: ['#ff6b6b', '#ffb347', '#f9ca24', '#6bcff6'],
    confetti: ['#ff6b6b','#ffb347','#c3b1e1','#a8e6cf','#f9ca24','#6bcff6','#ff9ff3','#ff6eb7']
  },
  {
    id: 'oceano',
    name: 'Casa en la playa',
    emoji: '🌊',
    swatch: ['#e0f7fa', '#80deea', '#4dd0e1', '#00838f'],
    pageBg: 'linear-gradient(145deg, #e0f7fa 0%, #b2ebf2 35%, #80cbc4 70%, #4db6ac 100%)',
    accent: '#00897b', accent2: '#26c6da', accent3: '#4dd0e1',
    accentRgb: '0, 137, 123',
    cardShadow: 'rgba(0, 105, 92, 0.2)',
    blob1: 'rgba(38, 198, 218, 0.2)', blob2: 'rgba(77, 208, 225, 0.22)',
    formulaBg: 'linear-gradient(135deg, #e0f7fa 0%, #e8f5e9 100%)',
    formulaBorder: 'rgba(0, 137, 123, 0.15)', formulaLabel: '#80cbc4',
    ringShadow: 'rgba(0, 137, 123, 0.28)',
    progress: ['#00897b', '#26c6da', '#4dd0e1', '#80deea'],
    confetti: ['#00897b','#26c6da','#4dd0e1','#80deea','#b2dfdb','#00acc1','#a7ffeb','#18ffff']
  },
  {
    id: 'bosque',
    name: 'Sierra de Gata',
    emoji: '🌿',
    swatch: ['#f1f8e9', '#aed581', '#7cb342', '#33691e'],
    pageBg: 'linear-gradient(145deg, #f1f8e9 0%, #dcedc8 35%, #a5d6a7 70%, #81c784 100%)',
    accent: '#558b2f', accent2: '#9ccc65', accent3: '#aed581',
    accentRgb: '85, 139, 47',
    cardShadow: 'rgba(56, 142, 60, 0.2)',
    blob1: 'rgba(156, 204, 101, 0.22)', blob2: 'rgba(129, 199, 132, 0.25)',
    formulaBg: 'linear-gradient(135deg, #f1f8e9 0%, #e8f5e9 100%)',
    formulaBorder: 'rgba(85, 139, 47, 0.15)', formulaLabel: '#a5d6a7',
    ringShadow: 'rgba(85, 139, 47, 0.28)',
    progress: ['#558b2f', '#7cb342', '#9ccc65', '#aed581'],
    confetti: ['#558b2f','#7cb342','#9ccc65','#aed581','#c5e1a5','#33691e','#dce775','#f0f4c3']
  },
  {
    id: 'lavanda',
    name: 'Lavanda',
    emoji: '💜',
    swatch: ['#f3e5f5', '#ce93d8', '#ab47bc', '#6a1b9a'],
    pageBg: 'linear-gradient(145deg, #f3e5f5 0%, #e1bee7 35%, #ce93d8 70%, #ba68c8 100%)',
    accent: '#8e24aa', accent2: '#ba68c8', accent3: '#ce93d8',
    accentRgb: '142, 36, 170',
    cardShadow: 'rgba(106, 27, 154, 0.2)',
    blob1: 'rgba(186, 104, 200, 0.22)', blob2: 'rgba(206, 147, 216, 0.25)',
    formulaBg: 'linear-gradient(135deg, #fce4ec 0%, #f3e5f5 100%)',
    formulaBorder: 'rgba(142, 36, 170, 0.15)', formulaLabel: '#ce93d8',
    ringShadow: 'rgba(142, 36, 170, 0.28)',
    progress: ['#8e24aa', '#ab47bc', '#ba68c8', '#ce93d8'],
    confetti: ['#8e24aa','#ab47bc','#ba68c8','#ce93d8','#e1bee7','#6a1b9a','#f48fb1','#b39ddb']
  },
  {
    id: 'cereza',
    name: 'Celia Coqueta',
    emoji: '🍒',
    swatch: ['#fce4ec', '#f48fb1', '#ec407a', '#c2185b'],
    pageBg: 'linear-gradient(145deg, #fce4ec 0%, #f8bbd9 35%, #f48fb1 70%, #f06292 100%)',
    accent: '#e91e63', accent2: '#f48fb1', accent3: '#f8bbd9',
    accentRgb: '233, 30, 99',
    cardShadow: 'rgba(194, 24, 91, 0.2)',
    blob1: 'rgba(244, 143, 177, 0.25)', blob2: 'rgba(248, 187, 217, 0.3)',
    formulaBg: 'linear-gradient(135deg, #fff0f5 0%, #fce4ec 100%)',
    formulaBorder: 'rgba(233, 30, 99, 0.15)', formulaLabel: '#f48fb1',
    ringShadow: 'rgba(233, 30, 99, 0.28)',
    progress: ['#e91e63', '#ec407a', '#f48fb1', '#f8bbd9'],
    confetti: ['#e91e63','#ec407a','#f48fb1','#f8bbd9','#c2185b','#ff80ab','#ff4081','#ffeb3b']
  },
  {
    id: 'noche',
    name: 'Noche en Salamanca',
    emoji: '🌙',
    swatch: ['#1a1a2e', '#16213e', '#0f3460', '#533483'],
    pageBg: 'linear-gradient(145deg, #1a1a2e 0%, #16213e 40%, #0f3460 75%, #533483 100%)',
    accent: '#e94560', accent2: '#ff6b9d', accent3: '#a29bfe',
    accentRgb: '233, 69, 96',
    cardShadow: 'rgba(15, 52, 96, 0.45)',
    blob1: 'rgba(233, 69, 96, 0.15)', blob2: 'rgba(162, 155, 254, 0.2)',
    formulaBg: 'linear-gradient(135deg, #1f2940 0%, #2a1f3d 100%)',
    formulaBorder: 'rgba(233, 69, 96, 0.2)', formulaLabel: '#a29bfe',
    ringShadow: 'rgba(233, 69, 96, 0.35)',
    progress: ['#e94560', '#ff6b9d', '#a29bfe', '#74b9ff'],
    confetti: ['#e94560','#ff6b9d','#a29bfe','#74b9ff','#fd79a8','#ffeaa7','#55efc4','#dfe6e9']
  }
];

let currentTheme = THEMES[0];
let confettiCols = [...currentTheme.confetti];

function applyTheme(theme) {
  currentTheme = theme;
  const r = document.documentElement;
  r.style.setProperty('--page-bg', theme.pageBg);
  r.style.setProperty('--accent', theme.accent);
  r.style.setProperty('--accent2', theme.accent2);
  r.style.setProperty('--accent3', theme.accent3);
  r.style.setProperty('--accent-rgb', theme.accentRgb);
  r.style.setProperty('--card-shadow', theme.cardShadow);
  r.style.setProperty('--blob1', theme.blob1);
  r.style.setProperty('--blob2', theme.blob2);
  r.style.setProperty('--formula-bg', theme.formulaBg);
  r.style.setProperty('--formula-border', theme.formulaBorder);
  r.style.setProperty('--formula-label', theme.formulaLabel);
  r.style.setProperty('--ring-shadow', theme.ringShadow);
  if (rgStops.length >= 3) {
    rgStops[0].setAttribute('stop-color', theme.accent);
    rgStops[1].setAttribute('stop-color', theme.accent2);
    rgStops[2].setAttribute('stop-color', theme.accent3);
  }
  confettiCols = [...theme.confetti];
  document.querySelectorAll('.theme-option').forEach(el => {
    el.classList.toggle('selected', el.dataset.themeId === theme.id);
  });
  try { localStorage.setItem('calcAvanceTheme', theme.id); } catch (_) {}
  calc();
}

function initThemes() {
  const grid = document.getElementById('themeGrid');
  THEMES.forEach(t => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'theme-option';
    btn.dataset.themeId = t.id;
    btn.innerHTML = `
      <div class="theme-swatch">${t.swatch.map(c => `<span style="background:${c}"></span>`).join('')}</div>
      <div class="theme-name">${t.emoji} ${t.name}</div>`;
    btn.addEventListener('click', () => applyTheme(t));
    grid.appendChild(btn);
  });
  let saved = 'atardecer';
  try { saved = localStorage.getItem('calcAvanceTheme') || saved; } catch (_) {}
  const found = THEMES.find(t => t.id === saved) || THEMES[0];
  applyTheme(found);
}

function switchTab(tabId) {
  const isCalc = tabId === 'calc';
  document.getElementById('tabCalc').classList.toggle('active', isCalc);
  document.getElementById('tabTheme').classList.toggle('active', !isCalc);
  document.getElementById('tabCalc').setAttribute('aria-selected', isCalc);
  document.getElementById('tabTheme').setAttribute('aria-selected', !isCalc);
  document.getElementById('panelCalc').classList.toggle('active', isCalc);
  document.getElementById('panelTheme').classList.toggle('active', !isCalc);
  document.getElementById('panelCalc').hidden = !isCalc;
  document.getElementById('panelTheme').hidden = isCalc;
}

document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => switchTab(btn.dataset.tab));
});

const MSGS = [
  { max: 0,   text: 'Ingresa los valores para calcular ', color: '#ccc' },
  { max: 10,  text: '¡Primer paso dado! 🌱' },
  { max: 25,  text: '¡Empezando con fuerza! 💪' },
  { max: 40,  text: '¡Buen ritmo, sigue adelante chocho! 🚀' },
  { max: 50,  text: '¡Ya vas por la mitad! 🌟' },
  { max: 65,  text: '¡Más de la mitad, genial! ✨' },
  { max: 75,  text: '¡Tres cuartos del camino! 🔥' },
  { max: 90,  text: '¡Casi llegas, no pares ahora! ⚡' },
  { max: 99,  text: '¡Falta poquísimo! ¡Ya casi! 💎' },
  { max: 100, text: '¡META CUMPLIDA! 🎉🎊🏆' },
  { max: Infinity, text: '¡Has superado la meta! 🏆🌈' },
];

function getColor(p) {
  const c = currentTheme.progress;
  if (p <= 25)  return c[0];
  if (p <= 50)  return c[1];
  if (p <= 75)  return c[2];
  if (p < 100)  return c[3];
  return '#2ecc71';
}

function getMsgColor(p) {
  if (p <= 0) return '#ccc';
  if (p >= 100) return '#2ecc71';
  const c = currentTheme.progress;
  if (p <= 25) return c[0];
  if (p <= 50) return c[1];
  if (p <= 75) return c[2];
  return c[3];
}

function getMsg(p) {
  for (const m of MSGS) if (p <= m.max) return m;
  return MSGS[MSGS.length - 1];
}

let raf = null, cur = 0;

function animTo(target) {
  cancelAnimationFrame(raf);
  const from = cur, dur = 650, t0 = performance.now();
  function step(now) {
    const t = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - t, 4);
    cur = from + (target - from) * e;
    const clamped = Math.min(cur, 100);
    rp.style.strokeDashoffset = CIRC * (1 - clamped / 100);
    pd.textContent = Math.round(cur) + '%';
    bf.style.width = clamped + '%';
    const c = getColor(cur);
    pd.style.color = c;
    rp.style.stroke = c;
    bf.style.background = `linear-gradient(90deg, ${currentTheme.accent}, ${c})`;
    bf.classList.toggle('show-dot', clamped > 2);
    if (t < 1) raf = requestAnimationFrame(step);
  }
  raf = requestAnimationFrame(step);
}

let confettiDone = false;

function calc() {
  const vl = parseFloat(document.getElementById('vl').value);
  const vt = parseFloat(document.getElementById('vt').value);

  if (isNaN(vl) || isNaN(vt) || vt <= 0) {
    animTo(0);
    st.textContent = (!isNaN(vt) && vt <= 0) ? 'El valor total debe ser mayor a 0 ⚠️' : 'Ingresa los valores para calcular';
    st.style.color = '#ccc';
    rc.style.display = 'none';
    confettiDone = false;
    return;
  }

  const pct = (vl / vt) * 100;
  animTo(pct);

  const m = getMsg(Math.round(pct));
  st.textContent = m.text;
  st.style.color = getMsgColor(Math.round(pct));

  const resta = Math.max(0, vt - vl);
  document.getElementById('tl').textContent = vl.toLocaleString('es');
  document.getElementById('tt').textContent = vt.toLocaleString('es');
  document.getElementById('tp').textContent = pct.toFixed(2) + '%';
  document.getElementById('tp').style.color = getColor(pct);
  document.getElementById('tr').textContent = resta.toLocaleString('es');
  rc.style.display = 'block';

  if (pct >= 100 && !confettiDone) {
    confettiDone = true;
    boom();
    const c = document.getElementById('mainCard');
    c.style.animation = 'pop 0.45s ease';
    setTimeout(() => c.style.animation = '', 450);
  }
  if (pct < 100) confettiDone = false;
}

document.getElementById('vl').addEventListener('input', calc);
document.getElementById('vt').addEventListener('input', calc);

function reset() {
  document.getElementById('vl').value = '';
  document.getElementById('vt').value = '';
  confettiDone = false;
  calc();
  document.getElementById('vl').focus();
}

document.getElementById('btnReset').addEventListener('click', reset);

/* ── CONFETTI ── */
const cv = document.getElementById('ccc');
const cx = cv.getContext('2d');
let parts = [], running = false;

function resize() { cv.width = innerWidth; cv.height = innerHeight; }
resize(); addEventListener('resize', resize);

function mkPart() {
  return {
    x: Math.random() * cv.width,
    y: -20,
    r: Math.random() * 9 + 4,
    col: confettiCols[Math.floor(Math.random() * confettiCols.length)],
    vx: (Math.random() - 0.5) * 5,
    vy: Math.random() * 3 + 2,
    ang: Math.random() * 360,
    spin: (Math.random() - 0.5) * 12,
    shape: Math.random() > 0.5 ? 'rect' : 'circle',
    op: 1
  };
}

function drawP(p) {
  cx.save();
  cx.globalAlpha = p.op;
  cx.fillStyle = p.col;
  cx.translate(p.x, p.y);
  cx.rotate(p.ang * Math.PI / 180);
  if (p.shape === 'rect') cx.fillRect(-p.r / 2, -p.r / 2, p.r, p.r * 1.6);
  else { cx.beginPath(); cx.arc(0, 0, p.r / 2, 0, Math.PI * 2); cx.fill(); }
  cx.restore();
}

function loop() {
  if (!running) return;
  cx.clearRect(0, 0, cv.width, cv.height);
  parts.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.ang += p.spin; p.vy += 0.12;
    if (p.y > cv.height * 0.75) p.op -= 0.025;
    drawP(p);
  });
  parts = parts.filter(p => p.op > 0);
  if (parts.length === 0) { running = false; cx.clearRect(0, 0, cv.width, cv.height); }
  else requestAnimationFrame(loop);
}

function boom() {
  if (running) return;
  running = true; parts = [];
  for (let i = 0; i < 140; i++) setTimeout(() => parts.push(mkPart()), i * 18);
  loop();
}

initThemes();
