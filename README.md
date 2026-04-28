# 🌿 Soulful

> AI mental wellness companion for Telegram — free, private, and always available.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/daksaras/soulful)
![License](https://img.shields.io/badge/license-MIT-green)
![Status](https://img.shields.io/badge/status-active-brightgreen)

---

## ✨ Features

- 💬 **AI Chat** — Empathetic conversations powered by Groq (LLaMA 3.3 70B)
- 🌍 **Bilingual** — Indonesian & English, switchable anytime
- 📊 **Mood Tracker** — Log daily mood with 7-day emoji calendar
- 🫁 **Breathing Exercise** — Interactive deep breathing with 3 patterns
- 🆘 **Crisis Detection** — Auto-shows emergency hotline for at-risk messages
- ☕ **Saweria Donation** — Built-in support button
- 🌙 **Dark Mode** — Follows system preference automatically
- 🔒 **Secure** — Telegram initData validation + Upstash Redis rate limiting

---

## 🚀 Quick Start

### 1. Clone & Setup

```bash
git clone https://github.com/daksaras/soulful.git
cd soulful
```

### 2. Environment Variables

Copy `.env.example` and fill in your keys:

```bash
cp .env.example .env
```

| Variable | Description |
|----------|-------------|
| `GROQ_API_KEY` | Get from [console.groq.com](https://console.groq.com) |
| `TELEGRAM_BOT_TOKEN` | Get from [@BotFather](https://t.me/BotFather) |
| `UPSTASH_REDIS_REST_URL` | Get from [upstash.com](https://upstash.com) |
| `UPSTASH_REDIS_REST_TOKEN` | Get from [upstash.com](https://upstash.com) |

### 3. Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

Or click the **Deploy** button at the top of this README.

### 4. Set Telegram Mini App

1. Open [@BotFather](https://t.me/BotFather)
2. `/mybots` → select your bot
3. **Bot Settings → Menu Button** → set URL to your Vercel domain

---

## 📁 Project Structure

```
soulful/
├── api/
│   └── chat.js          # Serverless proxy — Groq API + rate limiting + validation
├── public/
│   └── index.html       # Frontend — all UI, logic, and styles in one file
├── .github/
│   └── ISSUE_TEMPLATE/  # Bug report & feature request templates
├── .env.example         # Environment variable template
├── .gitignore           # Git ignore rules
├── CHANGELOG.md         # Version history
├── CONTRIBUTING.md      # Contribution guide
├── vercel.json          # Vercel routing config
└── README.md            # This file
```

---

## 🔒 Security

- **Telegram initData** validated server-side via HMAC-SHA256
- **API key** never exposed to client — all calls go through `/api/chat`
- **Rate limiting** via Upstash Redis — 10 requests/minute per user
- **Input validation** — max 1000 chars, last 12 messages only sent to Groq

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS (single file) |
| AI | Groq API — LLaMA 3.3 70B |
| Backend | Vercel Serverless Functions |
| Rate Limit | Upstash Redis |
| Platform | Telegram Mini App |

---

## 📝 Environment Setup (Vercel Dashboard)

Go to **Project → Settings → Environment Variables** and add:

```
GROQ_API_KEY=gsk_...
TELEGRAM_BOT_TOKEN=123456:ABC...
UPSTASH_REDIS_REST_URL=https://...upstash.io
UPSTASH_REDIS_REST_TOKEN=AX...
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for guidelines.  
Found a bug? Open an [issue](../../issues/new?template=bug_report.md).

---

## 📋 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for version history.

---

## ⚠️ Disclaimer

Soulful is an AI companion, **not a replacement for professional mental health care**.  
If you are in crisis, please contact **Into The Light Indonesia: 119 ext 8** (free, 24/7).

---

## 📄 License

MIT © [Daksara](https://github.com/daksaras)
