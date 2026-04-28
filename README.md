# 🌿 Soulful — Teman Cerita & Kesehatan Mental

Soulful adalah AI companion kesehatan mental berbasis Telegram Mini App. Dibangun untuk menjadi teman bicara yang hangat, aman, dan selalu ada — gratis untuk semua orang.

---

## ✨ Fitur

- 💬 **Chat AI streaming** — respons real-time via Groq (LLaMA 3.3 70B)
- 🌍 **Bilingual** — Indonesia & English, bisa ganti kapan saja
- 👤 **Onboarding** — pilih profil Remaja (13–17) atau Dewasa (18+), sistem prompt menyesuaikan
- 😰 **Mood chips** — shortcut topik: Cemas, Sedih, Burnout, Sulit Tidur, dll
- 📊 **Mood Tracker harian** — catat mood + catatan, history 7 hari
- 🫁 **Breathing exercise** — pola 4-4-4, 4-7-8, Box; animasi lingkaran
- 🆘 **Crisis detection** — deteksi kata kunci krisis, tampilkan hotline Into The Light (119 ext 8)
- 💾 **Chat history persist** — percakapan tersimpan di localStorage, tidak hilang saat reload
- ☕ **Donasi via Saweria** — tombol langsung ke halaman Saweria

---

## 🗂️ Struktur Repo

```
soulful-app/
├── api/
│   └── chat.js          # Backend: proxy ke Groq, rate limit, validasi Telegram
├── public/
│   ├── index.html       # HTML (struktur UI)
│   ├── style.css        # Semua styling + dark mode
│   ├── app.js           # Core: chat, bahasa, history persist, crisis
│   ├── mood.js          # Mood tracker
│   ├── breath.js        # Breathing exercise
│   └── donate.js        # Modal donasi Saweria
├── .env.example
├── vercel.json
└── README.md
```

---

## ⚙️ Setup

### 1. Clone repo

```bash
git clone https://github.com/daksara/soulful-app.git
cd soulful-app
```

### 2. Buat file `.env`

```bash
cp .env.example .env
```

Isi variabel berikut:

```env
GROQ_API_KEY=your_groq_api_key
TELEGRAM_BOT_TOKEN=your_bot_token        # opsional, untuk validasi Mini App
UPSTASH_REDIS_REST_URL=your_upstash_url  # opsional, untuk rate limit
UPSTASH_REDIS_REST_TOKEN=your_upstash_token
```

### 3. Deploy ke Vercel

```bash
npx vercel --prod
```

Atau hubungkan repo ke Vercel dashboard dan tambahkan environment variables di **Settings → Environment Variables**.

---

## 🔑 Environment Variables

| Variable | Wajib | Keterangan |
|---|---|---|
| `GROQ_API_KEY` | ✅ | API key dari [console.groq.com](https://console.groq.com) |
| `TELEGRAM_BOT_TOKEN` | ❌ | Untuk validasi `initData` Telegram Mini App |
| `UPSTASH_REDIS_REST_URL` | ❌ | Rate limiting via Upstash Redis |
| `UPSTASH_REDIS_REST_TOKEN` | ❌ | Token Upstash Redis |

> Tanpa `TELEGRAM_BOT_TOKEN`, validasi dinonaktifkan dan rate limit fallback ke in-memory.

---

## 🔒 Keamanan

- **Rate limit**: 10 request/menit per user (Upstash Redis atau in-memory fallback)
- **Validasi Telegram**: HMAC-SHA256 pada `initData`, cek expiry 24 jam
- **Input sanitasi**: max 1000 karakter per pesan, max 12 pesan per request
- **API key**: disimpan di server (Vercel env), tidak pernah ke frontend

---

## 💾 Penyimpanan Data (Client)

Semua data disimpan di `localStorage` pengguna — tidak ada data yang dikirim ke server selain pesan chat.

| Key | Isi |
|---|---|
| `soulful_lang` | Bahasa dipilih (`id` / `en`) |
| `soulful_age` | Profil user (`teen` / `adult`) |
| `soulful_chat_history` | 30 pesan terakhir |
| `soulful_mood_log` | Log mood harian (format YYYY-MM-DD) |

---

## 🛠️ Tech Stack

| Layer | Teknologi |
|---|---|
| Frontend | HTML · CSS · Vanilla JS |
| AI | [Groq](https://groq.com) — LLaMA 3.3 70B Versatile |
| Hosting | [Vercel](https://vercel.com) |
| Rate Limit | [Upstash Redis](https://upstash.com) |
| Platform | Telegram Mini App |

---

## ☕ Donasi

Soulful gratis dan open source. Kalau kamu merasa terbantu, traktir kopi di:

**[saweria.co/daksarasoulful](https://saweria.co/daksarasoulful)**

---

## ⚠️ Disclaimer

Soulful adalah teman bicara AI, **bukan pengganti psikolog atau tenaga kesehatan mental profesional**. Jika kamu dalam kondisi krisis, segera hubungi:

- **Into The Light Indonesia**: 119 ext 8 (Gratis, 24 jam)

---

## 📄 Lisensi

MIT License — bebas digunakan dan dimodifikasi dengan tetap mencantumkan kredit.
