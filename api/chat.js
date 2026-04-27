// Simple in-memory rate limit (MVP)
const rateLimitMap = new Map();

function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 60 * 1000; // 1 menit
  const maxReq = 10; // max 10 request / menit

  if (!rateLimitMap.has(ip)) {
    rateLimitMap.set(ip, []);
  }

  const timestamps = rateLimitMap.get(ip).filter(t => now - t < windowMs);

  if (timestamps.length >= maxReq) {
    return true;
  }

  timestamps.push(now);
  rateLimitMap.set(ip, timestamps);

  return false;
}

export default async function handler(req, res) {
  // Hanya izinkan POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Ambil IP user
  const ip =
    req.headers['x-forwarded-for']?.split(',')[0] ||
    req.socket?.remoteAddress ||
    'unknown';

  // 🚫 Rate limit check
  if (isRateLimited(ip)) {
    return res.status(429).json({
      error: 'Terlalu banyak request. Tunggu sebentar ya 🌿'
    });
  }

  // Ambil API key
  const GROQ_API_KEY = process.env.GROQ_API_KEY;
  if (!GROQ_API_KEY) {
    return res.status(500).json({
      error: 'API key tidak dikonfigurasi di server'
    });
  }

  try {
    const { messages } = req.body;

    // 🚫 Validasi basic
    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({
        error: 'Format messages tidak valid'
      });
    }

    // 🚫 Limit jumlah history (hemat token & performa)
    const trimmedMessages = messages.slice(-12);

    // 🚫 Limit panjang input terakhir (anti abuse)
    const lastMessage = trimmedMessages[trimmedMessages.length - 1];
    if (lastMessage?.content?.length > 1000) {
      return res.status(400).json({
        error: 'Pesan terlalu panjang (maks 1000 karakter)'
      });
    }

    // 🚫 Basic anti-spam (opsional, bisa dihapus kalau tidak perlu)
    if (/http|www|\.com/i.test(lastMessage?.content || '')) {
      return res.status(400).json({
        error: 'Link tidak diperbolehkan'
      });
    }

    // 🔗 Request ke Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
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
    });

    // 🚫 Handle error dari Groq
    if (!response.ok) {
      const err = await response.json();
      return res.status(response.status).json({
        error: err.error?.message || 'Groq API error'
      });
    }

    const data = await response.json();

    // 🚫 Validasi response
    if (!data?.choices?.[0]?.message?.content) {
      return res.status(500).json({
        error: 'Tidak ada response dari AI'
      });
    }

    return res.status(200).json(data);

  } catch (err) {
    console.error('Proxy error:', err);

    return res.status(500).json({
      error: 'Terjadi kesalahan server'
    });
  }
}