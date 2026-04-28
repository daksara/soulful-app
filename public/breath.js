/* ═══════════════════════════════════════════════
   SOULFUL — breath.js  (breathing exercise)
   ═══════════════════════════════════════════════ */

const PATTERNS = {
  '4-4-4': { inhale: 4, hold: 4, exhale: 4, label: '4-4-4' },
  '4-7-8': { inhale: 4, hold: 7, exhale: 8, label: '4-7-8' },
  'box':   { inhale: 4, hold: 4, exhale: 4, label: 'Box' }
};

let breathPattern   = PATTERNS['4-4-4'];
let breathRunning   = false;
let breathTimer     = null;
let breathPhaseTimer = null;
let cycles          = 0;

function openBreath() {
  document.getElementById('breathOverlay').classList.add('open');
  applyBreathLang();
  resetBreathUI();
}

function closeBreath() {
  stopBreath();
  document.getElementById('breathOverlay').classList.remove('open');
  if (cycles > 0) {
    setTimeout(() => addAI(T[lang].breathDone), 400);
    cycles = 0;
  }
}

function closeBreathOutside(e) {
  if (e.target === document.getElementById('breathOverlay')) closeBreath();
}

function applyBreathLang() {
  const t = T[lang];
  document.getElementById('breathTitle').textContent = t.breathTitle;
  document.getElementById('breathSub').textContent   = t.breathSub;
  document.getElementById('breathPhase').textContent = t.breathReady;
  document.getElementById('breathStartBtn').textContent = breathRunning ? t.breathStop : t.breathStart;
  document.getElementById('breathCycles').innerHTML  = t.breathCycles + ' <span id="cycleCount">' + cycles + '</span>';
  document.querySelector('.breath-close-btn').textContent = t.breathClose;
}

function setPattern(el, key) {
  breathPattern = PATTERNS[key];
  document.querySelectorAll('.pattern-btn').forEach(b => b.classList.remove('active'));
  el.classList.add('active');
  if (breathRunning) { stopBreath(); resetBreathUI(); }
}

function resetBreathUI() {
  const t   = T[lang];
  const ring = document.getElementById('breathRing');
  ring.className = 'breath-ring';
  document.getElementById('breathPhase').textContent    = t.breathReady;
  document.getElementById('breathCount').textContent    = '—';
  document.getElementById('breathStartBtn').textContent = t.breathStart;
  document.getElementById('cycleCount').textContent     = cycles;
}

function toggleBreath() {
  if (breathRunning) { stopBreath(); resetBreathUI(); }
  else startBreath();
}

function stopBreath() {
  breathRunning = false;
  clearTimeout(breathTimer);
  clearInterval(breathPhaseTimer);
  document.getElementById('breathStartBtn').textContent = T[lang].breathStart;
  document.getElementById('breathRing').className       = 'breath-ring';
}

function startBreath() {
  breathRunning = true;
  document.getElementById('breathStartBtn').textContent = T[lang].breathStop;
  runPhase('inhale', breathPattern.inhale, () =>
    runPhase('hold', breathPattern.hold, () =>
      runPhase('exhale', breathPattern.exhale, () => {
        if (!breathRunning) return;
        cycles++;
        document.getElementById('cycleCount').textContent = cycles;
        if (cycles >= 5) { stopBreath(); resetBreathUI(); return; }
        startBreath();
      })
    )
  );
}

function runPhase(phase, duration, onDone) {
  if (!breathRunning) return;
  const t       = T[lang];
  const ring    = document.getElementById('breathRing');
  const phaseEl = document.getElementById('breathPhase');
  const countEl = document.getElementById('breathCount');

  ring.className    = 'breath-ring ' + phase;
  phaseEl.textContent = phase === 'inhale' ? t.breathInhale
                      : phase === 'hold'   ? t.breathHold
                      : t.breathExhale;

  let sec = duration;
  countEl.textContent = sec;

  clearInterval(breathPhaseTimer);
  breathPhaseTimer = setInterval(() => {
    if (!breathRunning) { clearInterval(breathPhaseTimer); return; }
    sec--;
    countEl.textContent = sec;
    if (sec <= 0) {
      clearInterval(breathPhaseTimer);
      breathTimer = setTimeout(onDone, 200);
    }
  }, 1000);
}
