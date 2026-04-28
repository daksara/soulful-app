# Contributing to Soulful

Thanks for your interest in improving Soulful! 🌿

---

## 🐛 Reporting Bugs

1. Check [existing issues](../../issues) first
2. Open a new issue using the **Bug Report** template
3. Include: what happened, what you expected, steps to reproduce

---

## 💡 Suggesting Features

1. Open an issue using the **Feature Request** template
2. Explain the problem it solves, not just the solution
3. Keep Soulful's core values in mind: **simple, private, accessible**

---

## 🛠️ Making Changes

### Setup

```bash
git clone https://github.com/daksaras/soulful.git
cd soulful
cp .env.example .env
# Fill in your keys in .env
```

### File Guide

| File | What to edit |
|------|-------------|
| `public/index.html` | UI, styles, client JS, translations |
| `api/chat.js` | Server logic, rate limiting, validation |
| `vercel.json` | Routing config |

### Adding a Translation String

In `public/index.html`, find the `T` object in the `<script>` section:

```js
const T = {
  id: {
    myNewString: 'Teks Indonesia',
    // ...
  },
  en: {
    myNewString: 'English text',
    // ...
  }
};
```

Then use it anywhere with `T[lang].myNewString`.

### Pull Request Checklist

- [ ] Tested on mobile screen size
- [ ] Both ID and EN languages work
- [ ] Dark mode looks correct
- [ ] No API keys or secrets in code
- [ ] CHANGELOG.md updated

---

## 📐 Code Style

- **No build tools** — keep it plain HTML/CSS/JS, no bundlers
- **CSS variables** for all colors — use `var(--sage)`, not hardcoded hex
- **Mobile first** — Soulful is a Telegram Mini App, always test on mobile
- **Bilingual** — every user-facing string must have both `id` and `en` versions

---

## 🚫 Out of Scope

- User authentication / login systems
- Native mobile apps
- Storing chat history on server

---

Questions? Open an issue or reach out via Telegram. 🌿
