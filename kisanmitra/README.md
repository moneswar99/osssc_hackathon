# KisanMitra AI 🌾

> **AI-Powered Multilingual Farming Assistant for Small & Marginal Farmers in India**

KisanMitra AI puts agricultural intelligence directly in the hands of every farmer — crop disease detection, weather alerts, market prices, government schemes, and a multilingual AI assistant — all in one place, in their language.

---

## 📸 Features at a Glance

| Page | What it does |
|------|-------------|
| 🏠 **Landing Page** | Hero, features, testimonials, phone OTP login |
| 📊 **Dashboard** | Weather widget, farm info, impact stats, quick access |
| 🌦️ **Weather Intelligence** | 7-day forecast + AI farm recommendations |
| 📈 **Market Intelligence** | Live APMC rates, Recharts price trend graph, AI analysis |
| 🔬 **AI Crop Doctor** | Upload photo → disease detection, confidence score, treatment |
| 🌱 **Crop Advisor** | AI crop recommendations based on soil/season/water |
| 📋 **Government Schemes** | PM-KISAN, PMFBY, KCC, Rythu Bandhu with eligibility details |
| 💬 **AI Assistant** | Multilingual chat (EN/TE/HI) + voice input + text-to-speech |
| 🔔 **Alerts** | Weather, pest, market, scheme alerts with severity levels |
| 👤 **Farmer Profile** | Editable profile — name, location, crops, soil, language |
| ℹ️ **About** | Impact metrics, AI agent architecture, tech stack, roadmap |

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ and npm
- **Python** 3.10+

### 1. Start the Backend (FastAPI)

```bash
cd kisanmitra/backend

# Install dependencies
pip install -r requirements.txt

# Run the server
python main.py
```

API runs at **http://localhost:8000**
Interactive docs at **http://localhost:8000/docs**

### 2. Start the Frontend (React + Vite)

```bash
cd kisanmitra/frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

App runs at **http://localhost:3000**

> The Vite dev server proxies all `/api` calls to the backend automatically.
> The frontend works standalone in demo mode even without the backend.

---

## 📁 Project Structure

```
kisanmitra/
├── backend/
│   ├── main.py              FastAPI app — all API endpoints + demo data
│   └── requirements.txt     Python dependencies
│
├── frontend/
│   ├── src/
│   │   ├── components/      All page components
│   │   │   ├── LandingPage.tsx
│   │   │   ├── Dashboard.tsx
│   │   │   ├── WeatherPage.tsx
│   │   │   ├── MarketPage.tsx
│   │   │   ├── CropDoctorPage.tsx
│   │   │   ├── CropAdvisorPage.tsx
│   │   │   ├── SchemesPage.tsx
│   │   │   ├── ChatPage.tsx
│   │   │   ├── AlertsPage.tsx
│   │   │   ├── ProfilePage.tsx
│   │   │   ├── AboutPage.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Header.tsx
│   │   ├── context/
│   │   │   └── AppContext.tsx    Global state (language, profile, view)
│   │   ├── services/
│   │   │   └── api.ts           Typed API client
│   │   ├── types/
│   │   │   └── index.ts         TypeScript interfaces
│   │   ├── App.tsx              Root component + routing
│   │   ├── main.tsx             React entry point
│   │   └── index.css            Global styles + Tailwind
│   ├── index.html
│   ├── package.json
│   ├── vite.config.ts
│   ├── tailwind.config.js
│   └── tsconfig.json
│
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | Health check |
| `GET` | `/api/weather` | Current weather + 7-day forecast |
| `GET` | `/api/market` | APMC crop market prices |
| `GET` | `/api/schemes` | Government scheme listings |
| `GET` | `/api/alerts` | Farm alerts (weather, pest, market) |
| `GET` | `/api/stats` | Platform impact statistics |
| `GET` | `/api/farmer/profile` | Demo farmer profile |
| `POST` | `/api/chat` | Multilingual AI chat |
| `POST` | `/api/crop-disease` | Crop disease analysis (image upload) |
| `POST` | `/api/crop-recommendation` | AI crop recommendations |

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + TypeScript
- Vite 4 (build tool)
- Tailwind CSS 3 (styling)
- Lucide React (icons)
- Recharts (price trend graphs)
- Web Speech API (voice input + TTS)

**Backend**
- Python 3.10+
- FastAPI
- Uvicorn
- Pydantic v2

---

## 🌐 Languages Supported

| Language | Code | Status |
|----------|------|--------|
| English | `en` | ✅ Full support |
| Telugu (తెలుగు) | `te` | ✅ Chat + Voice |
| Hindi (हिंदी) | `hi` | ✅ Chat + Voice |

---

## 🤖 AI Agent Architecture

```
User → Web UI → FastAPI Backend → AI Orchestrator
                                       ↓
                    ┌──────────────────────────────────┐
                    │  Crop Disease Agent      🔬       │
                    │  Weather Intelligence Agent 🌦️   │
                    │  Crop Recommendation Agent 🌱     │
                    │  Market Intelligence Agent 📊     │
                    │  Government Scheme Agent   📋     │
                    │  Multilingual Assistant    🗣️    │
                    └──────────────────────────────────┘
                                       ↓
                              Data Sources / APIs
```

Each agent is modular and can be independently upgraded with real APIs or ML models.

---

## 📊 Demo Data

All data in this prototype is simulated for demonstration purposes:

- **Weather** — Guntur, Andhra Pradesh (34°C, 75% rain probability)
- **Market prices** — 6 crops across APMC mandis in AP & Telangana
- **Government schemes** — 5 real schemes (PM-KISAN, PMFBY, KCC, Rythu Bandhu, Soil Health Card)
- **Farmer profile** — Ravi Kumar, Pedapudi village, 3.5 acres
- **Crop disease** — Leaf Blight on Rice/Paddy (87.3% confidence)
- **Platform stats** — 12,847 farmers, 89,432 AI recommendations (illustrative)

---

## 🗺️ Roadmap

- [ ] Real weather API (OpenWeatherMap / IMD)
- [ ] Live APMC price feeds (Agmarknet API)
- [ ] Computer vision model for crop disease (PlantVillage dataset)
- [ ] LLM integration for smarter chat responses
- [ ] SMS/WhatsApp for low-connectivity farmers
- [ ] Offline PWA support
- [ ] PostgreSQL / Supabase database
- [ ] Phone OTP authentication (Twilio / Firebase)
- [ ] Google Maps for nearby markets and KVKs

---

## ⚠️ Disclaimer

KisanMitra AI provides informational and advisory outputs only. All crop, chemical, financial, and legal recommendations must be verified with qualified agricultural experts before acting. Market prices are indicative estimates. Government scheme eligibility should be confirmed with official sources.

---

*Built for Bharat's farmers. Jai Kisan! 🙏*
