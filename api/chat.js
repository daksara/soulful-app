// api/chat.js — Vercel Serverless Function
// Proxy aman ke Groq API, API key tersembunyi di server

export default async function handler(req, res) {
  // CORS headers — izinkan dari mana saja (Mini App Telegram)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: 'messages array required' });
  }

  const GROQ_API_KEY = process.env.GROQ_API_KEY; // Disimpan di Vercel env vars
  if (!GROQ_API_KEY) return res.status(500).json({ error: 'Server belum dikonfigurasi' });

  const SYSTEM_PROMPT = `Kamu adalah Soulful, AI pendamping kesehatan mental yang hangat dan empatik.

PERAN:
- Dengarkan dengan penuh perhatian tanpa menghakimi
- Validasi perasaan pengguna terlebih dahulu
- Gunakan pendekatan CBT sederhana
- Berikan teknik praktis: napas dalam, grounding, journaling
- Bahasa Indonesia yang hangat dan lembut

BATASAN PENTING:
- JANGAN pernah mendiagnosis kondisi mental
- Jika ada tanda bahaya (bunuh diri/menyakiti diri), SELALU arahkan ke: Into The Light Indonesia 119 ext 8
- Kamu bukan pengganti psikolog profesional

FORMAT: 2-3 paragraf pendek, akhiri dengan 1 pertanyaan reflektif atau teknik sederhana.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile', // Model terbaik Groq, gratis
        max_tokens: 800,
        temperature: 0.7,
        messages: [
          { role: 'system', content: SYSTEM_PROMPT },
          ...messages
        ]
      })
    });

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const reply = data.choices?.[0]?.message?.content || 'Maaf, tidak ada respons.';
    return res.status(200).json({ reply });

  } catch (err) {
    console.error('Groq error:', err);
    return res.status(500).json({ error: err.message });
  }
}
