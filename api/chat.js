import crypto from 'crypto';

// ─── RATE LIMIT ───────────────────────────────────────────
const rateLimitMap = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReq = 10;
  if (!rateLimitMap.has(key)) rateLimitMap.set(key, []);
  const timestamps = rateLimitMap.get(key).filter(t => now - t < windowMs);
  if (timestamps.length >= maxReq) return true;
  timestamps.push(now);
  rateLimitMap.set(key, timestamps);
  return false;
}

// ─── TELEGRAM initData VALIDATION ────────────────────────
function validateTelegramInitData(initData, botToken) {
  if (!initData || !botToken) return null;

  try {
    const params = new URLSearchParams(initData);
    const hash = params.get('hash');
    if (!hash) return null;

    // Build data-check-string (semua key kecuali hash, diurutkan)
    params.delete('hash');
    const dataCheckArr = [];
    params.forEach((val, key) => dataCheckArr.push(`${key}=${val}`));
    dataCheckArr.sort();
    const dataCheckString = dataCheckArr.join('\n');

    // HMAC-SHA256: key = HMAC("WebAppData", botToken), data = dataCheckString
    const secretKey = crypto
      .createHmac('sha256', 'WebAppData')
      .update(botToken)
      .digest();

    const expectedHash = crypto
      .createHmac('sha256', secretKey)
      .update(dataCheckString)
      .digest('hex');

    if (expectedHash !== hash) return null;

    // Cek expiry — initData valid 24 jam
    const authDate = parseInt(params.get('auth_date') || '0', 10);
    const age = Date.now() / 1000 - authDate;
    if (age > 86400) return null;

    // Return parsed user
    const userStr = params.get('user');
    return userStr ? JSON.parse(userStr) : null;

  } catch {
    return null;
  }
}

// ─── HANDLER ─────────────────────────────────────────────
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

  if (!GROQ_API_KEY) {
    return res.status(500).json({ error: 'API key tidak dikonfigurasi' });
  }

  const { initData, userId, messages } = req.body;

  // ─── Validasi Telegram initData ───────────────────────
  let verifiedUserId = null;

  if (BOT_TOKEN && initData) {
    const tgUser = validateTelegramInitData(initData, BOT_TOKEN);
    if (!tgUser) {
      return res.status(403).json({ error: 'Akses tidak valid. Buka melalui Telegram.' });
    }
    verifiedUserId = String(tgUser.id);
  } else {
    // Mode dev/fallback: pakai userId dari body atau IP
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress ||
      'unknown';
    verifiedUserId = userId || ip;
  }

  // ─── Rate limit ───────────────────────────────────────
  if (isRateLimited(verifiedUserId)) {
    return res.status(429).json({
      error: 'Kamu terlalu cepat kirim pesan. Tunggu sebentar ya 🌿'
    });
  }

  // ─── Validasi messages ────────────────────────────────
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'Format messages tidak valid' });
  }

  const trimmedMessages = messages.slice(-12);
  const lastMessage = trimmedMessages[trimmedMessages.length - 1];

  if (lastMessage?.content?.length > 1000) {
    return res.status(400).json({ error: 'Pesan terlalu panjang (maks 1000 karakter)' });
  }

  // ─── Streaming ke Groq ────────────────────────────────
  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        max_tokens: 800,
        temperature: 0.7,
        stream: true,
        messages: trimmedMessages
      })
    });

    if (!groqRes.ok) {
      const err = await groqRes.json();
      return res.status(groqRes.status).json({
        error: err.error?.message || 'Groq error'
      });
    }

    // Stream SSE langsung ke client
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const reader = groqRes.body.getReader();
    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      const chunk = decoder.decode(value, { stream: true });
      res.write(chunk);
    }

    res.end();

  } catch (err) {
    console.error('Streaming error:', err);
    if (!res.headersSent) {
      return res.status(500).json({ error: 'Server error' });
    }
    res.end();
  }
}
