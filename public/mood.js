/* ═══════════════════════════════════════════════
   SOULFUL — mood.js  (mood tracker)
   ═══════════════════════════════════════════════ */

const MOOD_EMOJIS = { 1:'😔', 2:'😕', 3:'😐', 4:'🙂', 5:'😊' };
const MOOD_KEY    = 'soulful_mood_log';
let selectedMoodVal = null;

function getMoodLog() {
  try { return JSON.parse(localStorage.getItem(MOOD_KEY) || '{}'); }
  catch { return {}; }
}
function saveMoodLog(log) {
  localStorage.setItem(MOOD_KEY, JSON.stringify(log));
}
function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

function openTracker() {
  selectedMoodVal = null;
  document.querySelectorAll('.mood-option').forEach(o => o.classList.remove('selected'));
  document.getElementById('trackerNote').value = '';
  document.getElementById('trackerSaveBtn').disabled = true;

  const log   = getMoodLog();
  const today = todayKey();
  if (log[today]) {
    const val = log[today].mood;
    selectedMoodVal = val;
    const opt = document.querySelector(`.mood-option[data-val="${val}"]`);
    if (opt) opt.classList.add('selected');
    document.getElementById('trackerNote').value = log[today].note || '';
    document.getElementById('trackerSaveBtn').disabled = false;
  }

  applyTrackerLang();
  renderCalendar();
  document.getElementById('trackerOverlay').classList.add('open');
}

function closeTracker() {
  document.getElementById('trackerOverlay').classList.remove('open');
}
function closeTrackerOutside(e) {
  if (e.target === document.getElementById('trackerOverlay')) closeTracker();
}

function selectMoodEntry(el, val) {
  document.querySelectorAll('.mood-option').forEach(o => o.classList.remove('selected'));
  el.classList.add('selected');
  selectedMoodVal = val;
  document.getElementById('trackerSaveBtn').disabled = false;
}

function saveMoodEntry() {
  if (!selectedMoodVal) return;
  const log  = getMoodLog();
  const note = document.getElementById('trackerNote').value.trim();
  log[todayKey()] = { mood: selectedMoodVal, note, ts: Date.now() };
  saveMoodLog(log);
  renderCalendar();

  const emoji = MOOD_EMOJIS[selectedMoodVal];
  setTimeout(() => {
    addAI(lang === 'id'
      ? `Terima kasih sudah mencatat mood-mu hari ini ${emoji}\n\nMencatat perasaan setiap hari adalah langkah kecil yang sangat berarti untuk kesehatan mentalmu. Apakah ada yang ingin kamu ceritakan tentang perasaan ini?`
      : `Thanks for logging your mood today ${emoji}\n\nTracking your feelings daily is a small but meaningful step for your mental wellbeing. Would you like to talk about how you're feeling?`
    );
  }, 400);

  closeTracker();
}

function renderCalendar() {
  const log  = getMoodLog();
  const cal  = document.getElementById('trackerCalendar');
  cal.innerHTML = '';
  const days  = lang === 'id'
    ? ['Min','Sen','Sel','Rab','Kam','Jum','Sab']
    : ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
  const today = new Date();

  for (let i = 6; i >= 0; i--) {
    const d       = new Date(today);
    d.setDate(today.getDate() - i);
    const key     = d.toISOString().slice(0, 10);
    const isToday = i === 0;
    const entry   = log[key];
    const dayLabel = days[d.getDay()];

    const div = document.createElement('div');
    div.className = 'cal-day';
    div.innerHTML = `
      <div class="cal-label">${dayLabel}</div>
      <div class="cal-emoji${isToday ? ' today' : ''}${!entry ? ' empty' : ''}">
        ${entry ? MOOD_EMOJIS[entry.mood] : '·'}
      </div>
    `;
    if (entry?.note) div.title = entry.note;
    cal.appendChild(div);
  }
}

function applyTrackerLang() {
  document.getElementById('trackerTitle').textContent =
    lang === 'id' ? 'Mood Hari Ini' : 'Today\'s Mood';
  document.getElementById('trackerSub').textContent =
    lang === 'id' ? 'Bagaimana perasaanmu hari ini?' : 'How are you feeling today?';
  document.getElementById('trackerHistoryTitle').textContent =
    lang === 'id' ? '7 HARI TERAKHIR' : 'LAST 7 DAYS';
  document.getElementById('trackerSaveBtn').textContent =
    lang === 'id' ? 'Simpan Mood' : 'Save Mood';
  document.getElementById('trackerCloseBtn').textContent =
    lang === 'id' ? 'Tutup' : 'Close';
  document.getElementById('trackerNote').placeholder =
    lang === 'id' ? 'Catatan singkat (opsional)...' : 'Quick note (optional)...';
  document.querySelectorAll('.mo-label').forEach(el => {
    el.textContent = el.dataset[lang];
  });
}
