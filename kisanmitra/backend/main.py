from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Optional, List
import uvicorn
import random
import json
from datetime import datetime, timedelta

app = FastAPI(title="KisanMitra AI API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ─── Models ───────────────────────────────────────────────────────────────────

class ChatMessage(BaseModel):
    message: str
    language: str = "en"
    farmer_id: Optional[str] = None

class CropRecommendationRequest(BaseModel):
    location: str
    soil_type: str
    season: str
    water_availability: str
    farm_size: float
    previous_crop: Optional[str] = None

class SchemeQuery(BaseModel):
    state: str
    farmer_category: str
    land_ownership: str
    crop: str
    farm_size: float
    income_category: str
    required_support: str

# ─── Demo Data ────────────────────────────────────────────────────────────────

DEMO_WEATHER = {
    "location": "Guntur, Andhra Pradesh",
    "temperature": 34,
    "humidity": 68,
    "rain_probability": 75,
    "wind_speed": 12,
    "condition": "Partly Cloudy",
    "soil_moisture": "Moderate",
    "forecast": [
        {"day": "Today", "high": 34, "low": 26, "condition": "Partly Cloudy", "rain": 75, "icon": "cloud-rain"},
        {"day": "Tomorrow", "high": 31, "low": 24, "condition": "Heavy Rain", "rain": 90, "icon": "cloud-rain"},
        {"day": "Wed", "high": 29, "low": 23, "condition": "Rainy", "rain": 80, "icon": "cloud-rain"},
        {"day": "Thu", "high": 32, "low": 25, "condition": "Cloudy", "rain": 40, "icon": "cloud"},
        {"day": "Fri", "high": 35, "low": 27, "condition": "Sunny", "rain": 10, "icon": "sun"},
        {"day": "Sat", "high": 36, "low": 28, "condition": "Sunny", "rain": 5, "icon": "sun"},
        {"day": "Sun", "high": 33, "low": 25, "condition": "Partly Cloudy", "rain": 30, "icon": "cloud"},
    ],
    "ai_recommendations": [
        {"type": "warning", "message": "Heavy rain expected tomorrow. Avoid irrigation and postpone any fertilizer application."},
        {"type": "alert", "message": "High humidity (68%) detected. Monitor your cotton crop closely for fungal diseases."},
        {"type": "info", "message": "Good conditions for paddy transplanting on Thursday and Friday this week."},
        {"type": "success", "message": "Soil moisture is adequate. No additional irrigation needed for the next 48 hours."},
    ]
}

DEMO_MARKET_DATA = [
    {"crop": "Paddy (Raw)", "current_price": 2183, "previous_price": 2150, "trend": "up", "market": "Guntur APMC", "unit": "Rs/Quintal", "best_time": "Nov-Dec", "change_percent": 1.53},
    {"crop": "Cotton", "current_price": 6850, "previous_price": 7100, "trend": "down", "market": "Warangal Mandi", "unit": "Rs/Quintal", "best_time": "Feb-Mar", "change_percent": -3.52},
    {"crop": "Chilli (Dry)", "current_price": 14200, "previous_price": 13800, "trend": "up", "market": "Khammam APMC", "unit": "Rs/Quintal", "best_time": "Apr-May", "change_percent": 2.90},
    {"crop": "Groundnut", "current_price": 5600, "previous_price": 5600, "trend": "stable", "market": "Kurnool Mandi", "unit": "Rs/Quintal", "best_time": "Dec-Jan", "change_percent": 0.0},
    {"crop": "Turmeric", "current_price": 10500, "previous_price": 9800, "trend": "up", "market": "Nizamabad APMC", "unit": "Rs/Quintal", "best_time": "Mar-Apr", "change_percent": 7.14},
    {"crop": "Maize", "current_price": 1890, "previous_price": 1950, "trend": "down", "market": "Nalgonda Mandi", "unit": "Rs/Quintal", "best_time": "Sep-Oct", "change_percent": -3.08},
]

DEMO_SCHEMES = [
    {
        "name": "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        "purpose": "Direct income support of Rs 6,000 per year to small and marginal farmers in three installments",
        "eligibility": "Small and marginal farmers with landholding up to 2 hectares",
        "documents": ["Aadhaar Card", "Land Records (Khatauni)", "Bank Account Details", "Mobile Number"],
        "application": "Visit nearest Common Service Centre (CSC) or apply online at pmkisan.gov.in",
        "link": "https://pmkisan.gov.in",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "benefit": "Rs 6,000/year",
        "category": "Income Support"
    },
    {
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "purpose": "Crop insurance scheme to provide financial support to farmers suffering crop loss due to natural calamities",
        "eligibility": "All farmers including sharecroppers and tenant farmers growing notified crops",
        "documents": ["Aadhaar Card", "Land Records", "Bank Passbook", "Sowing Certificate"],
        "application": "Apply through nearest bank, cooperative society or insurance company before sowing deadline",
        "link": "https://pmfby.gov.in",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "benefit": "Up to full sum insured",
        "category": "Insurance"
    },
    {
        "name": "Kisan Credit Card (KCC)",
        "purpose": "Provides farmers with timely credit support for agricultural needs, allied activities, and non-farm needs",
        "eligibility": "Farmers, sharecroppers, oral lessees, tenant farmers, and SHG/JLG members",
        "documents": ["Identity Proof", "Address Proof", "Land Records", "Passport Photo"],
        "application": "Apply at any nationalized bank, cooperative bank, or regional rural bank",
        "link": "https://www.nabard.org",
        "ministry": "Ministry of Finance / NABARD",
        "benefit": "Up to Rs 3 lakh at 4% interest",
        "category": "Credit"
    },
    {
        "name": "Rythu Bandhu (Andhra Pradesh)",
        "purpose": "Investment support scheme providing Rs 10,000 per acre per season to farmers in Andhra Pradesh",
        "eligibility": "Land-owning farmers in Andhra Pradesh",
        "documents": ["Aadhaar Card", "Patta Passbook", "Bank Account"],
        "application": "Automatically credited to eligible farmers based on land records. Contact local agriculture officer.",
        "link": "https://apagrisnet.gov.in",
        "ministry": "Government of Andhra Pradesh",
        "benefit": "Rs 10,000/acre/season",
        "category": "State Scheme"
    },
    {
        "name": "Soil Health Card Scheme",
        "purpose": "Provides farmers information about nutrient status of their soil and recommends appropriate dosage of nutrients",
        "eligibility": "All farmers across India",
        "documents": ["Aadhaar Card", "Land Details"],
        "application": "Contact nearest Krishi Vigyan Kendra (KVK) or agricultural department office",
        "link": "https://soilhealth.dac.gov.in",
        "ministry": "Ministry of Agriculture & Farmers Welfare",
        "benefit": "Free soil health card + nutrient recommendations",
        "category": "Advisory"
    }
]

DEMO_CROP_DISEASES = {
    "default": {
        "disease": "Leaf Blight",
        "crop": "Rice/Paddy",
        "confidence": 87.3,
        "severity": "Moderate",
        "symptoms": "Yellow to brown lesions on leaves, starting from leaf tips. Lesions expand with water-soaked margins. Affected leaves dry up and die prematurely.",
        "prevention": [
            "Use certified disease-free seeds",
            "Maintain proper spacing between plants (20cm x 15cm)",
            "Avoid excess nitrogen fertilizer",
            "Ensure proper drainage in the field",
            "Remove and destroy infected plant debris"
        ],
        "treatment": [
            "Apply Propiconazole 25% EC @ 1ml/litre of water",
            "Spray Tricyclazole 75% WP @ 0.6g/litre of water",
            "Repeat spray after 10-14 days if infection persists",
            "Ensure even coverage of entire plant"
        ],
        "warning": "Always consult a certified agricultural expert or your local Krishi Vigyan Kendra before applying any pesticide. Follow all safety guidelines on the label."
    }
}

CROP_RECOMMENDATIONS = [
    {
        "crop": "Paddy (Rice)",
        "period": "120-150 days",
        "water": "High (1200-1800mm)",
        "difficulty": "Medium",
        "yield": "4-6 tonnes/hectare",
        "market_demand": "Very High",
        "reason": "Excellent fit for your clay-loam soil and good water availability. Kharif season is ideal timing.",
        "icon": "rice"
    },
    {
        "crop": "Cotton",
        "period": "150-180 days",
        "water": "Medium (700-1200mm)",
        "difficulty": "High",
        "yield": "2-3 tonnes/hectare",
        "market_demand": "High",
        "reason": "High market value crop suitable for black cotton soil. Your farm size allows mechanized harvesting.",
        "icon": "plant"
    },
    {
        "crop": "Groundnut",
        "period": "90-120 days",
        "water": "Low-Medium (500-700mm)",
        "difficulty": "Low",
        "yield": "2-4 tonnes/hectare",
        "market_demand": "High",
        "reason": "Drought-tolerant crop ideal as rotation after your previous paddy. Improves soil nitrogen naturally.",
        "icon": "groundnut"
    }
]

# ─── Routes ───────────────────────────────────────────────────────────────────

@app.get("/")
def root():
    return {"message": "KisanMitra AI API", "version": "1.0.0", "status": "operational"}

@app.get("/api/weather")
def get_weather(location: str = "Guntur"):
    return DEMO_WEATHER

@app.get("/api/market")
def get_market():
    return {"data": DEMO_MARKET_DATA, "last_updated": datetime.now().isoformat(), "source": "Demo Data (APMC Markets)"}

@app.get("/api/schemes")
def get_schemes(state: str = "Andhra Pradesh"):
    return {"schemes": DEMO_SCHEMES, "total": len(DEMO_SCHEMES)}

@app.post("/api/crop-disease")
async def analyze_crop_disease(file: UploadFile = File(...)):
    # Demo response - in production, this would call a computer vision model
    return {
        "status": "success",
        "analysis": DEMO_CROP_DISEASES["default"],
        "demo_mode": True,
        "note": "This is a demo analysis. In production, this connects to a trained computer vision model."
    }

@app.post("/api/crop-recommendation")
def get_crop_recommendation(request: CropRecommendationRequest):
    return {
        "recommendations": CROP_RECOMMENDATIONS,
        "location": request.location,
        "season": request.season,
        "demo_mode": True
    }

@app.post("/api/chat")
def chat(message: ChatMessage):
    responses = {
        "en": {
            "keywords": {
                "rain": "Based on current weather data, there is a 75% chance of rainfall tomorrow in your area. I recommend postponing any scheduled irrigation and avoiding pesticide spraying today.",
                "disease": "To diagnose crop disease accurately, please use the AI Crop Doctor feature and upload a clear photo of the affected leaf or plant. I can provide general guidance based on your description.",
                "scheme": "There are several government schemes available for farmers like PM-KISAN (Rs 6000/year), PMFBY crop insurance, and Kisan Credit Card. Would you like details about any specific scheme?",
                "price": "Current market prices: Paddy Rs 2183/quintal, Cotton Rs 6850/quintal, Chilli Rs 14200/quintal. Prices are from APMC markets and may vary. Check the Market Intelligence section for detailed trends.",
                "fertilizer": "For paddy crop, the recommended fertilizer schedule is: Basal dose - DAP 50kg + MOP 25kg per acre. Top dressing - Urea 25kg at 21 days and 42 days after transplanting.",
                "default": "I'm KisanMitra AI, your farming assistant. I can help you with crop advice, weather information, disease detection, market prices, and government schemes. What would you like to know?"
            }
        },
        "te": {
            "keywords": {
                "default": "Namaskaram! Nenu KisanMitra AI, mee vyavasaya sahayakudu. Panta salaha, vatavarana samacharam, vyadhi gurthimpu, market dharalu mariyu prabhutvam pathakala gurinchi meeku sahayam chesagalanu."
            }
        },
        "hi": {
            "keywords": {
                "default": "Namaste! Main KisanMitra AI hoon, aapka krishi sahayak. Fasal salah, mausam jaankari, rog pahchaan, bazaar bhav aur sarkari yojanaon mein madad kar sakta hoon."
            }
        }
    }

    lang_responses = responses.get(message.language, responses["en"])
    keywords = lang_responses.get("keywords", {})

    msg_lower = message.message.lower()
    response_text = keywords.get("default", "I can help you with farming questions!")

    for keyword, response in keywords.items():
        if keyword != "default" and keyword in msg_lower:
            response_text = response
            break

    return {
        "response": response_text,
        "language": message.language,
        "timestamp": datetime.now().isoformat(),
        "demo_mode": True
    }

@app.get("/api/alerts")
def get_alerts():
    return {
        "alerts": [
            {"id": 1, "type": "weather", "severity": "high", "title": "Heavy Rainfall Warning", "message": "Heavy to very heavy rainfall expected in next 24 hours. Secure equipment and avoid field operations.", "time": "2 hours ago", "icon": "cloud-rain"},
            {"id": 2, "type": "pest", "severity": "medium", "title": "Fall Armyworm Alert", "message": "Fall Armyworm infestation reported in neighboring districts. Inspect your maize crops regularly.", "time": "5 hours ago", "icon": "bug"},
            {"id": 3, "type": "market", "severity": "low", "title": "Cotton Prices Declining", "message": "Cotton prices have dropped 3.5% this week. Consider holding stock if storage is available.", "time": "1 day ago", "icon": "trending-down"},
            {"id": 4, "type": "scheme", "severity": "info", "title": "PM-KISAN Installment Due", "message": "Next PM-KISAN installment disbursement expected within 2 weeks. Ensure your bank account is linked to Aadhaar.", "time": "2 days ago", "icon": "info"},
        ]
    }

@app.get("/api/farmer/profile")
def get_farmer_profile():
    return {
        "id": "F001",
        "name": "Ravi Kumar",
        "village": "Pedapudi",
        "district": "Guntur",
        "state": "Andhra Pradesh",
        "phone": "+91 98765 43210",
        "farm_size": 3.5,
        "soil_type": "Black Cotton Soil",
        "current_crops": ["Cotton", "Paddy"],
        "irrigation_type": "Drip + Flood",
        "preferred_language": "te",
        "member_since": "2024-01-15",
        "total_recommendations": 47,
        "schemes_enrolled": 3
    }

@app.get("/api/stats")
def get_stats():
    return {
        "farmers_assisted": 12847,
        "crop_losses_prevented": 2341,
        "languages_supported": 3,
        "ai_recommendations": 89432,
        "schemes_discovered": 1567,
        "diseases_detected": 3892
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
