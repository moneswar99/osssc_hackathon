# KisanMitra AI — Backend

Python FastAPI backend for the KisanMitra AI farming assistant. Provides all data APIs with realistic demo data, ready to plug in real data sources.

---

## Getting Started

```bash
# (Recommended) Create a virtual environment
python -m venv venv

# Activate — Windows
venv\Scripts\activate

# Activate — Linux / Mac
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the server
python main.py
```

API runs at **http://localhost:8000**
Interactive Swagger docs at **http://localhost:8000/docs**
ReDoc docs at **http://localhost:8000/redoc**

---

## API Reference

### Health Check
```
GET /
```
Returns API version and status.

---

### Weather
```
GET /api/weather?location=Guntur
```
Returns current weather conditions and 7-day forecast with AI farming recommendations.

**Response fields:**
- `location`, `temperature`, `humidity`, `rain_probability`, `wind_speed`, `condition`, `soil_moisture`
- `forecast[]` — 7 days with high/low/rain/icon
- `ai_recommendations[]` — type + message (warning / alert / info / success)

---

### Market Prices
```
GET /api/market
```
Returns APMC mandi prices for major crops.

**Response:** `{ data[], last_updated, source }`

Each item: `crop`, `current_price`, `previous_price`, `trend`, `market`, `unit`, `best_time`, `change_percent`

---

### Government Schemes
```
GET /api/schemes?state=Andhra Pradesh
```
Returns list of government schemes relevant to the farmer.

Each scheme: `name`, `purpose`, `eligibility`, `documents[]`, `application`, `link`, `ministry`, `benefit`, `category`

---

### Alerts
```
GET /api/alerts
```
Returns farm alerts with severity levels.

Each alert: `id`, `type`, `severity` (high/medium/low/info), `title`, `message`, `time`, `icon`

---

### Platform Stats
```
GET /api/stats
```
Returns impact statistics (farmers assisted, recommendations, diseases detected, etc.)

---

### Farmer Profile
```
GET /api/farmer/profile
```
Returns the demo farmer profile (Ravi Kumar, Guntur).

---

### AI Chat
```
POST /api/chat
Content-Type: application/json

{
  "message": "When should I irrigate paddy?",
  "language": "en"
}
```
Supported languages: `en`, `te`, `hi`

Returns: `{ response, language, timestamp, demo_mode }`

---

### Crop Disease Analysis
```
POST /api/crop-disease
Content-Type: multipart/form-data

file: <image file>
```
Returns disease analysis with confidence score, symptoms, prevention, and treatment steps.

> In production, this endpoint connects to a computer vision model trained on plant disease datasets (e.g., PlantVillage).

---

### Crop Recommendation
```
POST /api/crop-recommendation
Content-Type: application/json

{
  "location": "Guntur, Andhra Pradesh",
  "soil_type": "Black Cotton Soil",
  "season": "Kharif",
  "water_availability": "Medium",
  "farm_size": 3.5,
  "previous_crop": "Paddy"
}
```
Returns list of recommended crops with period, water, difficulty, yield, and market demand.

---

## Demo Data

All responses use realistic demo data for the Andhra Pradesh / Telangana region:

- **Weather** — Guntur, 34°C, partly cloudy, 75% rain chance
- **Market** — 6 crops: Paddy, Cotton, Chilli, Groundnut, Turmeric, Maize
- **Schemes** — PM-KISAN, PMFBY, KCC, Rythu Bandhu, Soil Health Card
- **Disease** — Leaf Blight on Rice/Paddy (87.3% confidence)
- **Crops** — Paddy, Cotton, Groundnut recommendations

---

## Production Integration Points

| Feature | Current | Production |
|---------|---------|------------|
| Weather | Demo data | OpenWeatherMap API / IMD |
| Market prices | Demo data | Agmarknet API / eNAM |
| Crop disease | Demo response | TensorFlow / PyTorch CV model |
| Chat responses | Keyword matching | OpenAI / Gemini / LLaMA |
| Schemes | Static list | Official government datasets |
| Auth | None | Firebase / Twilio OTP |
| Database | None | PostgreSQL / Supabase |

---

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| fastapi | 0.104+ | Web framework |
| uvicorn | 0.24+ | ASGI server |
| pydantic | 2.4+ | Data validation |
| python-multipart | 0.0.6+ | File upload support |

---

## Project Structure

```
backend/
├── main.py          All routes, models, and demo data
├── requirements.txt Python dependencies
└── README.md        This file
```

As the app grows, split into:
```
backend/
├── main.py
├── routers/
│   ├── weather.py
│   ├── market.py
│   ├── schemes.py
│   ├── chat.py
│   └── disease.py
├── agents/
│   ├── weather_agent.py
│   ├── market_agent.py
│   ├── disease_agent.py
│   └── scheme_agent.py
├── models/
│   └── schemas.py
└── data/
    └── demo_data.py
```
