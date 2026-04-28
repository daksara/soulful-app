# Changelog

All notable changes to Soulful are documented here.  
Format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

---

## [1.3.0] — 2025

### Added
- 🆘 Crisis detection — auto-shows emergency hotline (119 ext 8) for at-risk messages
- 📊 Mood Tracker — daily mood logging with 7-day emoji calendar
- 🫁 Breathing Exercise — interactive deep breathing (3 patterns: 4-4-4, 4-7-8, Box)
- 🌙 Dark Mode — automatic, follows system preference
- ☕ Persistent coffee button in header (replaces dismissible banner)

### Changed
- Saweria donation moved from dismissible banner to permanent header button
- Mood chips now wrap naturally instead of horizontal scroll

---

## [1.2.0] — 2025

### Added
- 🌍 Bilingual support — Indonesian & English with instant switching
- Chat history resets automatically when switching language
- System prompt switches language for AI responses

### Changed
- Quick replies now context-aware per language

---

## [1.1.0] — 2025

### Added
- ⚡ Streaming responses — AI replies appear word by word
- 🔒 Telegram initData validation via HMAC-SHA256
- 📦 Upstash Redis rate limiting — persistent across server restarts
- Blinking cursor animation during streaming

### Changed
- `/api/chat` now uses SSE streaming instead of single JSON response
- Rate limit fallback to in-memory if Redis not configured

### Security
- API key moved from frontend to Vercel environment variables
- initData validated server-side — cannot be spoofed from client

---

## [1.0.0] — 2025

### Added
- 💬 AI chat powered by Groq (LLaMA 3.3 70B)
- Mood chips for quick conversation starters
- Quick reply suggestions after each AI response
- Saweria donation integration
- Typing indicator animation
- Telegram Mini App support
