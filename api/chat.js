const rateLimitMap = new Map();

function isRateLimited(key) {
  const now = Date.now();
  const windowMs = 60 * 1000;
  const maxReq = 10;

  if (!rateLimitMap.has(key)) {
    rateLimitMap.set(key, []);
  }

  const timestamps = rateLimitMap.get(key).filter(t => now - t < windowMs);

  if (timestamps.length >= maxReq) {
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(key, timestamps);

  return false;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { userId, messages } = req.body;

  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  // 🔥 pakai userId kalau ada
  const key = userId || ip;

  // 🚫 rate limit
  if (isRateLimited(key)) {
    return res.status(429).json({
      error: 'Kamu terlalu cepat kirim pesan. Tunggu sebentar ya 🌿'
    });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({
      error: 'API key tidak dikonfigurasi'
    });
  }

  try {
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Format messages tidak valid'
      });
    }

    const trimmedMessages = messages.slice(-12);
    const lastMessage = trimmedMessages[trimmedMessages.length - 1];

    if (lastMessage?.content?.length > 1000) {
      return res.status(400).json({
        error: 'Pesan terlalu panjang'
      });
    }

    const response = await fetch(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          max_tokens: 800,
          temperature: 0.7,
          messages: trimmedMessages
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({
        error: err.error?.message || 'Groq error'
      });
    }

    const data = await response.json();

    return res.status(200).json(data);

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: 'Server error'
    });
  }
}