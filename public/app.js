/* ═══════════════════════════════════════════════
   SOULFUL — app.js  (core: lang · chat · persist)
   ═══════════════════════════════════════════════ */

// ─── STORAGE KEYS ────────────────────────────────────────
const KEY_LANG    = 'soulful_lang';
const KEY_AGE     = 'soulful_age';
const KEY_HISTORY = 'soulful_chat_history';  // ← NEW: chat persist
const MAX_HISTORY_STORED = 30; // pesan yang disimpan ke localStorage

// ─── LANGUAGE ────────────────────────────────────────────
let lang = localStorage.getItem(KEY_LANG) || 'id';

const T = {
  id: {
    headerSub: 'Teman cerita & kesehatan mental',
    placeholder: 'Ceritakan perasaanmu...',
    disclaimer: '🌿 Soulful adalah teman bicara AI, <strong>bukan pengganti psikolog profesional</strong>. Jika kamu dalam krisis, hubungi <strong>Into The Light: 119 ext 8</strong>',
    welcome: 'Halo 🌿 Aku Soulful, teman cerita kamu.\n\nRuang ini aman — ceritakan apapun yang kamu rasakan tanpa takut dihakimi. Aku di sini untuk mendengarkan.\n\nBagaimana perasaanmu sekarang?',
    welcomeQR: ['Aku mau cerita...', 'Ajari teknik relaksasi', 'Aku butuh semangat hari ini', 'Aku lagi sangat cemas'],
    noReply: 'Maaf, tidak ada respons.',
    modalTitle: 'Traktir Soulful Kopi',
    modalSub: 'Donasimu membantu Soulful tetap gratis untuk semua orang.\nTerima kasih sudah peduli! 🌿',
    saweriaBtn: '☕ Donasi via Saweria',
    modalNote: 'Kamu akan diarahkan ke halaman Saweria yang aman.',
    thankYou: 'Terima kasih banyak sudah mendukung Soulful! 💛☕\n\nDonasimu membantu kami tetap gratis untuk semua orang yang membutuhkan dukungan mental. Kamu luar biasa! 🌿',
    moodAnxious: 'Aku merasa sangat cemas hari ini',
    moodSad: 'Aku merasa sangat sedih dan tidak tahu kenapa',
    moodBurnout: 'Aku kelelahan dan burnout karena pekerjaan',
    moodSleep: 'Aku susah tidur dan pikiranku tidak bisa tenang',
    moodLonely: 'Aku merasa sangat kesepian',
    moodFrust: 'Aku merasa marah dan frustrasi',
    moodMotiv: 'Aku butuh motivasi untuk melanjutkan hari ini',
    moodOverwhelm: 'Aku merasa overwhelmed dengan banyak hal',
    breathTitle: 'Napas Dalam',
    breathSub: 'Ikuti irama lingkaran untuk menenangkan pikiran',
    breathInhale: 'Tarik Napas',
    breathHold: 'Tahan',
    breathExhale: 'Hembuskan',
    breathReady: 'Siap',
    breathStart: 'Mulai',
    breathStop: 'Berhenti',
    breathClose: 'Tutup',
    breathCycles: 'Siklus:',
    breathDone: 'Bagus sekali! 🌿 Kamu telah menyelesaikan latihan napas dalam.\n\nBagaimana perasaanmu sekarang?',
    systemPrompt: `Kamu adalah Soulful, AI pendamping kesehatan mental yang hangat dan empatik.
Dengarkan dengan penuh perhatian tanpa menghakimi. Validasi perasaan pengguna terlebih dahulu.
Gunakan pendekatan CBT sederhana. Berikan teknik praktis: napas dalam, grounding, journaling.
Bahasa Indonesia yang hangat dan lembut. JANGAN mendiagnosis kondisi mental.
Jika ada tanda bahaya, arahkan ke: Into The Light 119 ext 8.
FORMAT: 2-3 paragraf pendek, akhiri dengan 1 pertanyaan reflektif.`,
    systemPromptTeen: `Kamu adalah Soulful, AI teman curhat untuk remaja yang hangat dan empatik.
Gunakan bahasa yang santai, ramah, dan mudah dipahami remaja. Hindari istilah psikologi yang berat.
Validasi perasaan mereka terlebih dahulu — perasaan mereka valid dan penting.
Berikan tips praktis yang relevan untuk remaja: manajemen stres sekolah, pertemanan, keluarga, identitas diri.
JANGAN mendiagnosis. Jangan terdengar seperti orang tua atau guru yang menggurui.
Jika ada tanda bahaya, segera arahkan ke: Into The Light 119 ext 8 atau cerita ke orang dewasa terpercaya.
FORMAT: 2-3 paragraf pendek, bahasa gaul halus, akhiri dengan 1 pertanyaan reflektif yang ringan.`,
  },
  en: {
    headerSub: 'Your mental wellness companion',
    placeholder: 'Share how you feel...',
    disclaimer: '🌿 Soulful is an AI companion, <strong>not a replacement for a professional therapist</strong>. Please seek professional help if you need it.',
    welcome: 'Hello 🌿 I\'m Soulful, your safe space to talk.\n\nThis is a judgment-free zone — share anything you\'re feeling. I\'m here to listen.\n\nHow are you feeling right now?',
    welcomeQR: ['I want to talk...', 'Teach me relaxation techniques', 'I need motivation today', 'I\'m feeling very anxious'],
    noReply: 'Sorry, no response received.',
    modalTitle: 'Buy Soulful a Coffee',
    modalSub: 'Your donation helps keep Soulful free for everyone.\nThank you for caring! 🌿',
    saweriaBtn: '☕ Donate via Saweria',
    modalNote: 'You\'ll be redirected to the secure Saweria page.',
    thankYou: 'Thank you so much for supporting Soulful! 💛☕\n\nYour donation helps us stay free for everyone who needs mental health support. You\'re amazing! 🌿',
    moodAnxious: 'I am feeling very anxious today',
    moodSad: 'I feel very sad and I don\'t know why',
    moodBurnout: 'I am exhausted and burned out from work',
    moodSleep: 'I can\'t sleep and my mind won\'t quiet down',
    moodLonely: 'I feel very lonely',
    moodFrust: 'I feel angry and frustrated',
    moodMotiv: 'I need motivation to get through today',
    moodOverwhelm: 'I feel overwhelmed by everything',
    breathTitle: 'Deep Breathing',
    breathSub: 'Follow the circle rhythm to calm your mind',
    breathInhale: 'Inhale',
    breathHold: 'Hold',
    breathExhale: 'Exhale',
    breathReady: 'Ready',
    breathStart: 'Start',
    breathStop: 'Stop',
    breathClose: 'Close',
    breathCycles: 'Cycles:',
    breathDone: 'Well done! 🌿 You\'ve completed your deep breathing exercise.\n\nHow are you feeling now?',
    systemPrompt: `You are Soulful, a warm and empathetic AI mental wellness companion.
Listen attentively without judgment. Always validate the user's feelings first.
Use simple CBT approaches. Provide practical techniques: deep breathing, grounding, journaling.
Use warm, gentle English. Do NOT diagnose any mental conditions.
If there are danger signs, advise the user to seek professional help immediately.
FORMAT: 2-3 short paragraphs, end with 1 reflective question.`,
    systemPromptTeen: `You are Soulful, a warm and friendly AI companion for teenagers.
Use casual, relatable language — speak like a caring older friend, not a therapist or parent.
Always validate their feelings first — what they feel is real and important.
Give practical tips relevant to teens: school stress, friendships, family, self-identity, social media pressure.
Do NOT diagnose. Avoid heavy psychological jargon.
If there are danger signs, encourage them to talk to a trusted adult or call a crisis line immediately.
FORMAT: 2-3 short paragraphs, warm casual tone, end with 1 light reflective question.`,
  }
};

function getLangText(key) { return T[lang][key]; }

function setLang(l) {
  if (lang === l) return;
  lang = l;
  localStorage.setItem(KEY_LANG, lang);
  document.getElementById('btnID').classList.toggle('active', l === 'id');
  document.getElementById('btnEN').classList.toggle('active', l === 'en');
  applyLang();

  // Reset chat saat ganti bahasa (history tetap disimpan tapi tampilan di-reset)
  history = [];
  clearChatHistory();
  const chat = document.getElementById('chat');
  chat.innerHTML = `<div class="disclaimer" id="disclaimer">${T[lang].disclaimer}</div>`;
  setTimeout(() => addAI(T[lang].welcome, T[lang].welcomeQR), 300);
}

function applyLang() {
  const t = T[lang];
  document.querySelector('.header-sub').textContent = t.headerSub;
  document.getElementById('inp').placeholder = t.placeholder;
  document.getElementById('disclaimer').innerHTML = t.disclaimer;
  document.querySelector('.modal-title').textContent = t.modalTitle;
  document.querySelector('.modal-sub').innerHTML = t.modalSub.replace('\n', '<br>');
  document.querySelector('.saweria-btn').textContent = t.saweriaBtn;
  document.querySelector('.modal-note').childNodes[0].textContent = t.modalNote;
  document.querySelectorAll('.mood-bar .chip span').forEach(span => {
    span.textContent = span.dataset[lang];
  });
}

// ─── CHAT HISTORY PERSIST ────────────────────────────────
/**
 * Format tersimpan: array of { role, content, time, isWelcome? }
 * Disimpan ke localStorage, di-restore saat load.
 */
function loadChatHistory() {
  try {
    return JSON.parse(localStorage.getItem(KEY_HISTORY) || '[]');
  } catch { return []; }
}

function saveChatHistory() {
  // Simpan hanya N pesan terakhir supaya tidak kembung
  const toSave = chatLog.slice(-MAX_HISTORY_STORED);
  localStorage.setItem(KEY_HISTORY, JSON.stringify(toSave));
}

function clearChatHistory() {
  chatLog = [];
  localStorage.removeItem(KEY_HISTORY);
}

function restoreChatHistory() {
  const saved = loadChatHistory();
  if (!saved.length) return false;

  const chat = document.getElementById('chat');
  saved.forEach(entry => {
    if (entry.role === 'user') {
      renderUserBubble(entry.content, entry.time);
    } else {
      renderAIBubble(entry.content, entry.time);
    }
    // Rebuild API history (tanpa welcome message)
    if (!entry.isWelcome) {
      history.push({ role: entry.role, content: entry.content });
    }
  });

  chatLog = saved;
  scrollBottom();
  return true;
}

// ─── INIT ────────────────────────────────────────────────
let history  = [];   // untuk dikirim ke API
let chatLog  = [];   // untuk disimpan ke localStorage
let busy     = false;

const tg = window.Telegram?.WebApp;
if (tg) { tg.ready(); tg.expand(); }

const userId   = tg?.initDataUnsafe?.user?.id ? String(tg.initDataUnsafe.user.id) : null;
const initData = tg?.initData || null;

window.onload = () => {
  if (lang === 'en') {
    document.getElementById('btnID').classList.remove('active');
    document.getElementById('btnEN').classList.add('active');
  }
  applyLang();

  if (!userAge) {
    document.getElementById('onboarding').classList.add('open');
    applyOnboardingLang();
  } else {
    // Coba restore chat history dulu
    const restored = restoreChatHistory();
    if (!restored) {
      setTimeout(() => addAI(T[lang].welcome, T[lang].welcomeQR), 400);
    }
  }
};

// ─── SEND (STREAMING) ────────────────────────────────────
async function send() {
  const inp  = document.getElementById('inp');
  const text = inp.value.trim();
  if (!text || busy) return;

  inp.value = ''; inp.style.height = 'auto';
  document.getElementById('sendBtn').disabled = true;
  busy = true;

  const t = now();
  addUser(text, t);
  history.push({ role: 'user', content: text });
  chatLog.push({ role: 'user', content: text, time: t });
  saveChatHistory();

  if (isCrisis(text)) showCrisis();

  showTyping();

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        initData,
        userId,
        messages: [
          { role: 'system', content: getSystemPrompt() },
          ...history
        ]
      })
    });

    if (!res.ok) {
      const data = await res.json();
      throw new Error(data.error || `Error ${res.status}`);
    }

    hideTyping();
    const bubble  = addAIStreaming();
    const reader  = res.body.getReader();
    const decoder = new TextDecoder();
    let fullText  = '';
    let buffer    = '';

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop();

      for (const line of lines) {
        if (!line.startsWith('data: ')) continue;
        const data = line.slice(6).trim();
        if (data === '[DONE]') continue;
        try {
          const json  = JSON.parse(data);
          const delta = json.choices?.[0]?.delta?.content;
          if (delta) {
            fullText += delta;
            bubble.innerHTML = fullText.replace(/\n/g, '<br>');
            scrollBottom();
          }
        } catch { /* skip */ }
      }
    }

    // Finalize streaming bubble
    bubble.classList.remove('streaming-bubble');
    const aiTime = now();
    const wrap   = bubble.closest('.msg-wrap');
    const timeEl = wrap.querySelector('.bubble-time');
    if (timeEl) timeEl.textContent = aiTime;

    history.push({ role: 'assistant', content: fullText });
    chatLog.push({ role: 'assistant', content: fullText, time: aiTime });
    saveChatHistory();

    addQuickRepliesAfter(bubble, getQuickReplies(text));

  } catch (err) {
    hideTyping();
    showToast('❌ ' + err.message);
    console.error(err);
  }

  busy = false;
  document.getElementById('sendBtn').disabled = false;
}

// ─── RENDER HELPERS ──────────────────────────────────────
function renderUserBubble(text, time) {
  const chat = document.getElementById('chat');
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap user';
  wrap.innerHTML = `
    <div class="bubble user">${esc(text)}</div>
    <div class="bubble-time">${time || now()}</div>
  `;
  chat.appendChild(wrap);
}

function renderAIBubble(text, time) {
  const chat = document.getElementById('chat');
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap ai';
  const formatted = text.replace(/\n/g, '<br>');
  wrap.innerHTML = `
    <div class="ai-row">
      <div class="ai-mini-avatar">🌿</div>
      <div class="bubble ai">${formatted}</div>
    </div>
    <div class="bubble-time" style="padding-left:36px">${time || now()}</div>
  `;
  chat.appendChild(wrap);
}

function addUser(text, time) {
  renderUserBubble(text, time);
  scrollBottom();
}

function addAI(text, qr = [], time) {
  const chat = document.getElementById('chat');
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap ai';
  const formatted = text.replace(/\n/g, '<br>');
  const t = time || now();
  wrap.innerHTML = `
    <div class="ai-row">
      <div class="ai-mini-avatar">🌿</div>
      <div class="bubble ai">${formatted}</div>
    </div>
    <div class="bubble-time" style="padding-left:36px">${t}</div>
  `;
  if (qr.length) {
    const qrDiv = document.createElement('div');
    qrDiv.className = 'quick-replies';
    qr.forEach(q => {
      const btn = document.createElement('button');
      btn.className = 'qr-btn';
      btn.textContent = q;
      btn.onclick = () => { document.getElementById('inp').value = q; qrDiv.remove(); send(); };
      qrDiv.appendChild(btn);
    });
    wrap.appendChild(qrDiv);
  }
  chat.appendChild(wrap);
  scrollBottom();
}

function addAIStreaming() {
  const chat = document.getElementById('chat');
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap ai';
  wrap.innerHTML = `
    <div class="ai-row">
      <div class="ai-mini-avatar">🌿</div>
      <div class="bubble ai streaming-bubble"></div>
    </div>
    <div class="bubble-time" style="padding-left:36px">${now()}</div>
  `;
  chat.appendChild(wrap);
  scrollBottom();
  return wrap.querySelector('.streaming-bubble');
}

function addQuickRepliesAfter(bubble, qr) {
  if (!qr.length) return;
  const wrap  = bubble.closest('.msg-wrap');
  const qrDiv = document.createElement('div');
  qrDiv.className = 'quick-replies';
  qr.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'qr-btn';
    btn.textContent = q;
    btn.onclick = () => { document.getElementById('inp').value = q; qrDiv.remove(); send(); };
    qrDiv.appendChild(btn);
  });
  wrap.appendChild(qrDiv);
  scrollBottom();
}

// ─── TYPING ──────────────────────────────────────────────
function showTyping() {
  const chat = document.getElementById('chat');
  const wrap = document.createElement('div');
  wrap.className = 'msg-wrap ai'; wrap.id = 'typing';
  wrap.innerHTML = `
    <div class="typing-wrap">
      <div class="ai-mini-avatar">🌿</div>
      <div class="typing-bubble">
        <div class="dot"></div><div class="dot"></div><div class="dot"></div>
      </div>
    </div>`;
  chat.appendChild(wrap);
  scrollBottom();
}
function hideTyping() { document.getElementById('typing')?.remove(); }

// ─── MOOD CHIPS ──────────────────────────────────────────
function useMood(el, text) {
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  document.getElementById('inp').value = text;
  send();
  setTimeout(() => el.classList.remove('active'), 1500);
}

// ─── QUICK REPLIES ────────────────────────────────────────
function getQuickReplies(msg) {
  const m = msg.toLowerCase();
  if (lang === 'en') {
    if (m.includes('anxi') || m.includes('panic') || m.includes('worry'))
      return ['Teach me deep breathing', 'What\'s making me anxious?', '5-4-3-2-1 grounding technique'];
    if (m.includes('sad') || m.includes('cry') || m.includes('depress'))
      return ['I want to share more', 'Why do I feel this way?', 'How can I feel better?'];
    if (m.includes('sleep') || m.includes('insomnia') || m.includes('restless'))
      return ['Tips for better sleep', 'Relaxation before bed', 'Why can\'t my mind settle?'];
    if (m.includes('burnout') || m.includes('tired') || m.includes('exhaust'))
      return ['How to overcome burnout', 'I need to rest', 'Tips to maintain energy'];
    if (m.includes('lonely') || m.includes('alone') || m.includes('isolated'))
      return ['I need someone to talk to', 'How to feel more connected?', 'Tell me more...'];
    if (m.includes('motiv') || m.includes('stuck') || m.includes('unmotiv'))
      return ['Help me start today', 'Self-motivation techniques', 'I feel stuck'];
    return ['Tell me more', 'What can I do right now?', 'Teach me a relaxation technique'];
  }
  if (m.includes('cemas') || m.includes('panik') || m.includes('anxious'))
    return ['Ajari teknik napas dalam', 'Apa yang membuatku cemas?', 'Teknik grounding 5-4-3-2-1'];
  if (m.includes('sedih') || m.includes('nangis') || m.includes('menangis'))
    return ['Aku mau cerita lebih', 'Kenapa aku merasa begini?', 'Bagaimana cara merasa lebih baik?'];
  if (m.includes('tidur') || m.includes('insomnia') || m.includes('gelisah'))
    return ['Tips tidur lebih baik', 'Teknik relaksasi sebelum tidur', 'Kenapa pikiranku tidak tenang?'];
  if (m.includes('burnout') || m.includes('lelah') || m.includes('cape') || m.includes('capek'))
    return ['Cara atasi burnout', 'Aku perlu istirahat', 'Tips menjaga energi'];
  if (m.includes('kesepian') || m.includes('sendiri'))
    return ['Aku butuh teman bicara', 'Bagaimana cara merasa terhubung?', 'Cerita lebih...'];
  if (m.includes('motivasi') || m.includes('semangat'))
    return ['Bantu aku mulai hari ini', 'Teknik motivasi diri', 'Aku merasa stuck'];
  return ['Ceritakan lebih lanjut', 'Apa yang bisa kulakukan sekarang?', 'Ajari teknik relaksasi'];
}

// ─── HELPERS ─────────────────────────────────────────────
function scrollBottom() {
  const chat = document.getElementById('chat');
  setTimeout(() => chat.scrollTop = chat.scrollHeight, 50);
}
function now() {
  return new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
}
function esc(t) {
  return t.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/\n/g,'<br>');
}
function showToast(msg) {
  const t = document.createElement('div');
  t.className = 'toast'; t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3000);
}
function onType(el) {
  el.style.height = 'auto';
  el.style.height = Math.min(el.scrollHeight, 110) + 'px';
  document.getElementById('sendBtn').disabled = !el.value.trim();
}
function onKey(e) {
  if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
}

// ─── ONBOARDING & AGE ────────────────────────────────────
let userAge = localStorage.getItem(KEY_AGE) || null;

function getSystemPrompt() {
  return userAge === 'teen' ? T[lang].systemPromptTeen : T[lang].systemPrompt;
}

function selectAge(age) {
  userAge = age;
  document.getElementById('ageTeen').classList.toggle('selected', age === 'teen');
  document.getElementById('ageAdult').classList.toggle('selected', age === 'adult');
  document.getElementById('obStartBtn').classList.add('ready');
}

function finishOnboarding() {
  if (!userAge) return;
  localStorage.setItem(KEY_AGE, userAge);
  document.getElementById('onboarding').classList.remove('open');
  const restored = restoreChatHistory();
  if (!restored) {
    setTimeout(() => addAI(T[lang].welcome, T[lang].welcomeQR), 300);
  }
}

function applyOnboardingLang() {
  const isID = lang === 'id';
  document.getElementById('obSub').textContent = isID
    ? 'Teman cerita AI yang hangat, aman, dan selalu ada untuk mendengarkan.'
    : 'A warm AI companion, always here to listen without judgment.';
  document.getElementById('obQuestion').textContent = isID ? 'Kamu masuk kategori mana?' : 'Which describes you?';
  document.getElementById('obTeenLabel').textContent = isID ? 'Remaja' : 'Teen';
  document.getElementById('obAdultLabel').textContent = isID ? 'Dewasa' : 'Adult';
  document.getElementById('obStartBtn').textContent = isID ? 'Mulai Cerita' : 'Let\'s Start';
  document.getElementById('obPrivacy').textContent = isID
    ? '🔒 Pilihanmu disimpan di perangkat. Tidak ada data yang dikirim ke server.'
    : '🔒 Your choice is saved on your device. No data is sent to the server.';
}

// ─── CRISIS DETECTION ────────────────────────────────────
const CRISIS_KEYWORDS_ID = [
  'bunuh diri','ingin mati','mau mati','pengen mati','tidak mau hidup',
  'tidak ingin hidup','menyakiti diri','nyakitin diri','melukai diri',
  'aku mau mengakhiri','mengakhiri hidup','tidak ada harapan','hopeless',
  'tidak sanggup lagi','sudah tidak kuat','sudah tidak tahan',
  'lebih baik mati','tidak berguna hidup','hilang saja'
];
const CRISIS_KEYWORDS_EN = [
  'kill myself','end my life','want to die','wanna die','don\'t want to live',
  'no reason to live','hurt myself','self harm','cut myself','suicide',
  'no hope','hopeless','can\'t go on','can\'t take it anymore',
  'better off dead','not worth living','disappear forever'
];

function isCrisis(text) {
  const t = text.toLowerCase();
  const keywords = lang === 'id'
    ? [...CRISIS_KEYWORDS_ID, ...CRISIS_KEYWORDS_EN]
    : CRISIS_KEYWORDS_EN;
  return keywords.some(kw => t.includes(kw));
}

function showCrisis() {
  const isID = lang === 'id';
  document.getElementById('crisisTitle').textContent =
    isID ? 'Kamu Tidak Sendirian' : 'You Are Not Alone';
  document.getElementById('crisisBody').innerHTML = isID
    ? 'Aku dengar kamu sedang merasakan sesuatu yang sangat berat.<br>Tolong hubungi profesional yang bisa benar-benar membantumu sekarang.'
    : 'I hear you\'re going through something very heavy.<br>Please reach out to a professional who can truly help you right now.';
  document.getElementById('crisisHotlineSub').textContent =
    isID ? 'Gratis • 24 Jam • Rahasia' : 'Free • 24 Hours • Confidential';
  document.getElementById('crisisCallBtn').textContent =
    isID ? '📞 Hubungi Sekarang' : '📞 Call Now';
  document.getElementById('crisisContinueBtn').textContent =
    isID ? 'Lanjut bicara dengan Soulful' : 'Continue talking with Soulful';
  document.getElementById('crisisBanner').classList.add('open');
  tg?.HapticFeedback?.notificationOccurred('error');
}

function closeCrisis() {
  document.getElementById('crisisBanner').classList.remove('open');
}
