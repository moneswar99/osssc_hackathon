# KisanMitra AI — Frontend

React 18 + TypeScript + Tailwind CSS frontend for the KisanMitra AI farming assistant.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# → http://localhost:3000

# Type check
npx tsc --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```

---

## Environment

The Vite dev server proxies `/api/*` requests to `http://localhost:8000` (the FastAPI backend).
Configure the proxy target in `vite.config.ts` if your backend runs on a different port.

```ts
// vite.config.ts
proxy: {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
  }
}
```

---

## Pages & Components

| Component | Route (tab) | Description |
|-----------|-------------|-------------|
| `LandingPage` | `landing` | Public landing page with login flow |
| `Dashboard` | `dashboard` | Overview — weather, alerts, quick access, stats |
| `WeatherPage` | `weather` | 7-day forecast + AI farming recommendations |
| `MarketPage` | `market` | Crop prices, Recharts trend graph, AI insights |
| `CropDoctorPage` | `crop-doctor` | Image upload + AI disease diagnosis |
| `CropAdvisorPage` | `advisor` | Form-based AI crop recommendation |
| `SchemesPage` | `schemes` | Government scheme browser with filters |
| `ChatPage` | `chat` | Multilingual chat + voice input + TTS |
| `AlertsPage` | `alerts` | Farm alerts with severity + read/dismiss |
| `ProfilePage` | `profile` | Editable farmer profile |
| `AboutPage` | `about` | App info, architecture, roadmap |
| `Sidebar` | — | Navigation sidebar (desktop + mobile drawer) |
| `Header` | — | Top bar — title, language switcher, bells |

---

## State Management

Global state lives in `src/context/AppContext.tsx`:

| State | Type | Purpose |
|-------|------|---------|
| `language` | `'en' \| 'te' \| 'hi'` | Active UI language |
| `activeTab` | `string` | Current page |
| `view` | `'landing' \| 'app'` | Landing vs app shell |
| `profile` | `FarmerProfile \| null` | Loaded farmer profile |

---

## API Client

All backend calls go through `src/services/api.ts`:

```ts
api.getWeather()
api.getMarket()
api.getSchemes()
api.getAlerts()
api.getStats()
api.getFarmerProfile()
api.chat(message, language)
api.getCropRecommendation(payload)
api.analyzeCropDisease(file)
```

---

## Voice Features (Chat Page)

- **Voice input** — Web Speech API (`webkitSpeechRecognition`)
  - Supports `en-IN`, `te-IN`, `hi-IN`
  - Works in Chrome and Chromium-based browsers
- **Text-to-speech** — `SpeechSynthesis` API
  - Toggle on/off with the Voice button in chat
  - Reads AI responses aloud in the selected language

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | TypeScript compile + Vite production build |
| `npm run preview` | Serve the production build locally |

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.2 | UI framework |
| react-dom | 18.2 | DOM rendering |
| react-router-dom | 6.18 | Client-side routing |
| recharts | 2.9 | Price trend charts |
| lucide-react | 0.292 | Icon set |
| typescript | 5.2 | Type safety |
| tailwindcss | 3.3 | Utility CSS |
| vite | 4.5 | Build tool |

---

## Folder Structure

```
src/
├── components/       Page and layout components
├── context/          AppContext — global state
├── services/         api.ts — typed fetch client
├── types/            index.ts — TypeScript interfaces
├── App.tsx           Root — landing vs app routing
├── main.tsx          ReactDOM entry point
└── index.css         Tailwind base + global overrides
```
