# 🗳️ VoteSphere AI

> **Next-Generation Interactive Election Education Platform**
> AI-powered • Dark Futuristic UI • Production Ready

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| **🗺️ Election Journey** | 8-step interactive timeline from voter registration to results |
| **🤖 AI Assistant** | Voice-enabled Gemini AI chat for election questions |
| **🧠 Quiz System** | MCQ quiz with badges, scoring, and shareable results |
| **📖 Smart Glossary** | Instant-search election terminology with category filters |
| **📊 Civic Dashboard** | Animated readiness score with progress tracking |
| **⌘K Command Palette** | VS Code-style quick navigation and search |
| **🎬 Election Simulation** | Cinematic step-by-step voting experience |
| **♿ Accessibility** | Font scaling, high contrast, voice reading, keyboard nav |
| **🎨 Dark Futuristic UI** | Glassmorphism, neon accents, smooth animations |

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | Next.js 14 (App Router), React, TypeScript |
| **Styling** | Tailwind CSS, Custom Glassmorphism System |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Backend** | Node.js, Express.js |
| **AI** | Google Gemini 1.5 Flash |
| **Database** | Firebase Firestore (optional) |
| **Voice** | Web Speech API (zero dependencies) |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- npm or yarn

### 1. Clone & Install

```bash
git clone <repo-url>
cd VirtualPromptWars

# Install frontend
cd frontend
npm install

# Install backend
cd ../backend
npm install
```

### 2. Configure Environment

```bash
# In /backend
cp .env.example .env
# Edit .env with your API keys (optional - works without them)
```

### 3. Run Development Servers

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## 📁 Project Structure

```
VirtualPromptWars/
├── frontend/               # Next.js 14 Application
│   ├── src/
│   │   ├── app/            # Pages (App Router)
│   │   │   ├── page.tsx    # Landing page
│   │   │   ├── journey/    # Election journey
│   │   │   ├── chat/       # AI assistant
│   │   │   ├── quiz/       # Quiz system
│   │   │   ├── glossary/   # Smart glossary
│   │   │   └── dashboard/  # Civic score
│   │   ├── components/     # React components
│   │   └── lib/            # Utilities & constants
│   └── tailwind.config.ts
├── backend/                # Express.js API
│   ├── server.js
│   └── routes/
│       ├── chat.js         # Gemini AI chat
│       ├── glossary.js     # Glossary API
│       ├── quiz.js         # Quiz scoring
│       └── health.js       # Health check
└── README.md
```

---

## 🔐 Security

- ✅ Environment variables for all secrets
- ✅ Helmet.js security headers
- ✅ CORS restricted to frontend origin
- ✅ Input sanitization on all endpoints
- ✅ Rate limiting on AI chat
- ✅ Graceful error handling
- ✅ No API keys exposed to client

---

## ♿ Accessibility

- Skip-to-main-content link
- WCAG AA color contrast
- Keyboard navigable (Tab, Enter, Escape)
- `prefers-reduced-motion` support
- Font size adjustment (80%–140%)
- High contrast mode
- Text-to-speech reading
- Proper `aria-labels` on all controls

---

## 📄 License

MIT — Built for democracy, open for everyone.
