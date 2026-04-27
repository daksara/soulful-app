# 🌿 Soulful — AI Psikolog Telegram Mini App

Bot Telegram Mini App kesehatan mental berbasis Groq AI (gratis selamanya).
User tidak perlu input API key apapun!

---

## 📁 Struktur Project

```
soulful/
├── api/
│   └── chat.js          ← Backend serverless (Vercel)
├── public/
│   └── index.html       ← Frontend Mini App
├── vercel.json          ← Konfigurasi Vercel
└── README.md
```

---

## 🚀 Cara Deploy (15 menit)

### Langkah 1 — Dapatkan Groq API Key (Gratis)

1. Buka https://console.groq.com
2. Daftar akun gratis
3. Buat API Key → salin

---

### Langkah 2 — Deploy ke Vercel

1. Buka https://vercel.com → login dengan GitHub
2. Klik **"Add New Project"**
3. Upload folder `soulful` ini (atau push ke GitHub dulu)
4. Di bagian **Environment Variables**, tambahkan:
   - Key: `GROQ_API_KEY`
   - Value: `gsk_xxxxxxxxxxxxxxx` (API key Groq kamu)
5. Klik **Deploy**
6. Salin URL deploy, contoh: `https://soulful-abc123.vercel.app`

---

### Langkah 3 — Update URL di Frontend

Buka `public/index.html`, cari baris:

```javascript
const API_URL = 'https://YOUR-PROJECT.vercel.app/api/chat';
```

Ganti dengan URL Vercel kamu:

```javascript
const API_URL = 'https://soulful-abc123.vercel.app/api/chat';
```

Lalu deploy ulang (push ke GitHub → auto deploy).

---

### Langkah 4 — Buat Bot Telegram

1. Buka Telegram → cari **@BotFather**
2. Ketik `/newbot`
3. Ikuti instruksi → salin **Bot Token**
4. Ketik `/newapp` di BotFather
5. Pilih bot kamu → isi:
   - **Title**: Soulful
   - **Description**: AI Teman Kesehatan Mental
   - **Photo**: upload gambar (opsional)
   - **Web App URL**: `https://soulful-abc123.vercel.app`
6. Selesai! 🎉

---

### Langkah 5 — Tambah Tombol ke Bot (Opsional)

Untuk menampilkan tombol "Buka Soulful" di bot:

```python
# bot.py — pakai python-telegram-bot
from telegram import Update, WebAppInfo, InlineKeyboardButton, InlineKeyboardMarkup
from telegram.ext import ApplicationBuilder, CommandHandler, ContextTypes

TOKEN = "YOUR_BOT_TOKEN"
WEBAPP_URL = "https://soulful-abc123.vercel.app"

async def start(update: Update, ctx: ContextTypes.DEFAULT_TYPE):
    keyboard = [[InlineKeyboardButton(
        "🌿 Buka Soulful",
        web_app=WebAppInfo(url=WEBAPP_URL)
    )]]
    await update.message.reply_text(
        "Halo! Aku Soulful 🌿\nTeman cerita & kesehatan mentalmu.",
        reply_markup=InlineKeyboardMarkup(keyboard)
    )

app = ApplicationBuilder().token(TOKEN).build()
app.add_handler(CommandHandler("start", start))
app.run_polling()
```

Deploy bot ini di Railway (gratis):
1. Push ke GitHub
2. Buka https://railway.app → New Project → GitHub
3. Tambah env var: `TOKEN=your_bot_token`
4. Deploy!

---

## 💰 Biaya

| Layanan | Biaya |
|---------|-------|
| Vercel (hosting) | **GRATIS** selamanya |
| Groq API (AI) | **GRATIS** ~14.4 juta token/hari |
| Railway (bot) | **GRATIS** $5 kredit/bulan |
| Telegram | **GRATIS** selamanya |

**Total: Rp 0 / bulan** 🎉

---

## ⚠️ Disclaimer

Soulful adalah AI pendamping, bukan pengganti psikolog profesional.
Jika ada pengguna dalam krisis: Into The Light Indonesia **119 ext 8**
