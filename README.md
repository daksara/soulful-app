# Soulful

A warm, judgment-free AI mental wellness companion built as a Telegram Mini App. Soulful listens, validates, and supports — available to everyone, for free.

---

## Features

**Conversation**
- Real-time streaming chat powered by Groq (LLaMA 3.3 70B)
- Bilingual support — Indonesian and English, switchable at any time
- Age-aware onboarding — Teen (13–17) or Adult (18+) profiles with tailored system prompts
- Mood chips for quick topic shortcuts (anxiety, burnout, loneliness, and more)
- Context-aware quick replies after each response

**Wellness Tools**
- Daily mood tracker with emoji scale and 7-day calendar history
- Guided breathing exercises — 4-4-4, 4-7-8, and Box patterns with animated ring

**Safety**
- Keyword-based crisis detection with immediate display of emergency hotline (Into The Light — 119 ext 8)
- Haptic feedback on crisis trigger (Telegram)

**Persistence**
- Chat history saved to localStorage — conversations resume across sessions
- All user data stays on-device; nothing is sent to the server except chat messages

---

## Project Structure

```
soulful-app/
├── api/
│   └── chat.js        # Groq proxy, rate limiting, Telegram initData validation
├── public/
│   ├── index.html     # Markup
│   ├── style.css      # Styles and dark mode
│   ├── app.js         # Core: chat, language, history, crisis detection
│   ├── mood.js        # Mood tracker
│   ├── breath.js      # Breathing exercise
│   └── donate.js      # Saweria donation modal
├── .env.example
├── vercel.json
└── README.md
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/daksara/soulful-app.git
cd soulful-app
```

### 2. Configure environment variables

```bash
cp .env.example .env
```

| Variable | Required | Description |
|---|---|---|
| `GROQ_API_KEY` | Yes | API key from [console.groq.com](https://console.groq.com) |
| `TELEGRAM_BOT_TOKEN` | No | Enables Telegram `initData` validation |
| `UPSTASH_REDIS_REST_URL` | No | Redis-backed rate limiting |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token |

> Without `TELEGRAM_BOT_TOKEN`, initData validation is skipped and rate limiting falls back to in-memory.

### 3. Deploy to Vercel

```bash
npx vercel --prod
```

Or connect the repository to your Vercel dashboard and add the environment variables under **Settings → Environment Variables**.

---

## Security

- **Rate limiting** — 10 requests per minute per user, via Upstash Redis with in-memory fallback
- **Telegram validation** — HMAC-SHA256 verification of `initData` with 24-hour expiry check
- **Input validation** — messages capped at 1,000 characters; last 12 messages sent per request
- **Secret management** — API keys are server-side only; never exposed to the client

---

## Client-Side Storage

All data is stored in the user's `localStorage`. No personal data is transmitted to any server.

| Key | Contents |
|---|---|
| `soulful_lang` | Selected language (`id` / `en`) |
| `soulful_age` | User profile (`teen` / `adult`) |
| `soulful_chat_history` | Last 30 messages |
| `soulful_mood_log` | Daily mood entries (keyed by `YYYY-MM-DD`) |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | HTML, CSS, Vanilla JS |
| AI | Groq — LLaMA 3.3 70B Versatile |
| Hosting | Vercel |
| Rate Limiting | Upstash Redis |
| Platform | Telegram Mini App |

---

## Disclaimer

Soulful is an AI companion and is **not a substitute for professional mental health care**. If you or someone you know is in crisis, please reach out to a qualified professional or contact a crisis line immediately.

- **Into The Light Indonesia** — 119 ext 8 (free, 24/7)

---

## Support

If Soulful has been helpful to you, consider supporting its development:

[saweria.co/daksarasoulful](https://saweria.co/daksarasoulful)

---

## License

MIT — free to use and modify with attribution.
