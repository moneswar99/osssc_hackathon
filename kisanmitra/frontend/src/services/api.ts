import type {
  WeatherData,
  MarketItem,
  GovernmentScheme,
  CropDisease,
  Alert,
  FarmerProfile,
  Language,
  CropRecommendation,
} from '../types';

const BASE_URL = '/api';

// ─── Demo / Fallback Data ───────────────────────────────────────────────────

const DEMO_WEATHER: WeatherData = {
  location: "Guntur, Andhra Pradesh",
  temperature: 34,
  humidity: 68,
  rain_probability: 75,
  wind_speed: 12,
  condition: "Partly Cloudy",
  soil_moisture: "Moderate",
  forecast: [
    { day: "Today", high: 34, low: 26, condition: "Partly Cloudy", rain: 75, icon: "cloud-rain" },
    { day: "Tomorrow", high: 31, low: 24, condition: "Heavy Rain", rain: 90, icon: "cloud-rain" },
    { day: "Wed", high: 29, low: 23, condition: "Rainy", rain: 80, icon: "cloud-rain" },
    { day: "Thu", high: 32, low: 25, condition: "Cloudy", rain: 40, icon: "cloud" },
    { day: "Fri", high: 35, low: 27, condition: "Sunny", rain: 10, icon: "sun" },
    { day: "Sat", high: 36, low: 28, condition: "Sunny", rain: 5, icon: "sun" },
    { day: "Sun", high: 33, low: 25, condition: "Partly Cloudy", rain: 30, icon: "cloud" },
  ],
  ai_recommendations: [
    { type: "warning", message: "Heavy rain expected tomorrow. Avoid irrigation and postpone any fertilizer application." },
    { type: "alert", message: "High humidity (68%) detected. Monitor your cotton crop closely for fungal diseases." },
    { type: "info", message: "Good conditions for paddy transplanting on Thursday and Friday this week." },
    { type: "success", message: "Soil moisture is adequate. No additional irrigation needed for the next 48 hours." },
  ]
};

const DEMO_MARKET_DATA: MarketItem[] = [
  { crop: "Paddy (Raw)", current_price: 2183, previous_price: 2150, trend: "up", market: "Guntur APMC", unit: "Rs/Quintal", best_time: "Nov-Dec", change_percent: 1.53 },
  { crop: "Cotton", current_price: 6850, previous_price: 7100, trend: "down", market: "Warangal Mandi", unit: "Rs/Quintal", best_time: "Feb-Mar", change_percent: -3.52 },
  { crop: "Chilli (Dry)", current_price: 14200, previous_price: 13800, trend: "up", market: "Khammam APMC", unit: "Rs/Quintal", best_time: "Apr-May", change_percent: 2.90 },
  { crop: "Groundnut", current_price: 5600, previous_price: 5600, trend: "stable", market: "Kurnool Mandi", unit: "Rs/Quintal", best_time: "Dec-Jan", change_percent: 0.0 },
  { crop: "Turmeric", current_price: 10500, previous_price: 9800, trend: "up", market: "Nizamabad APMC", unit: "Rs/Quintal", best_time: "Mar-Apr", change_percent: 7.14 },
  { crop: "Maize", current_price: 1890, previous_price: 1950, trend: "down", market: "Nalgonda Mandi", unit: "Rs/Quintal", best_time: "Sep-Oct", change_percent: -3.08 },
];

const DEMO_SCHEMES: GovernmentScheme[] = [
  {
    name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
    purpose: "Direct income support of Rs 6,000 per year to small and marginal farmers in three installments",
    eligibility: "Small and marginal farmers with landholding up to 2 hectares",
    documents: ["Aadhaar Card", "Land Records (Khatauni)", "Bank Account Details", "Mobile Number"],
    application: "Visit nearest Common Service Centre (CSC) or apply online at pmkisan.gov.in",
    link: "https://pmkisan.gov.in",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefit: "Rs 6,000/year",
    category: "Income Support"
  },
  {
    name: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
    purpose: "Crop insurance scheme to provide financial support to farmers suffering crop loss due to natural calamities",
    eligibility: "All farmers including sharecroppers and tenant farmers growing notified crops",
    documents: ["Aadhaar Card", "Land Records", "Bank Passbook", "Sowing Certificate"],
    application: "Apply through nearest bank, cooperative society or insurance company before sowing deadline",
    link: "https://pmfby.gov.in",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefit: "Up to full sum insured",
    category: "Insurance"
  },
  {
    name: "Kisan Credit Card (KCC)",
    purpose: "Provides farmers with timely credit support for agricultural needs, allied activities, and non-farm needs",
    eligibility: "Farmers, sharecroppers, oral lessees, tenant farmers, and SHG/JLG members",
    documents: ["Identity Proof", "Address Proof", "Land Records", "Passport Photo"],
    application: "Apply at any nationalized bank, cooperative bank, or regional rural bank",
    link: "https://www.nabard.org",
    ministry: "Ministry of Finance / NABARD",
    benefit: "Up to Rs 3 lakh at 4% interest",
    category: "Credit"
  },
  {
    name: "Rythu Bandhu (Andhra Pradesh)",
    purpose: "Investment support scheme providing Rs 10,000 per acre per season to farmers in Andhra Pradesh",
    eligibility: "Land-owning farmers in Andhra Pradesh",
    documents: ["Aadhaar Card", "Patta Passbook", "Bank Account"],
    application: "Automatically credited to eligible farmers based on land records. Contact local agriculture officer.",
    link: "https://apagrisnet.gov.in",
    ministry: "Government of Andhra Pradesh",
    benefit: "Rs 10,000/acre/season",
    category: "State Scheme"
  },
  {
    name: "Soil Health Card Scheme",
    purpose: "Provides farmers information about nutrient status of their soil and recommends appropriate dosage of nutrients",
    eligibility: "All farmers across India",
    documents: ["Aadhaar Card", "Land Details"],
    application: "Contact nearest Krishi Vigyan Kendra (KVK) or agricultural department office",
    link: "https://soilhealth.dac.gov.in",
    ministry: "Ministry of Agriculture & Farmers Welfare",
    benefit: "Free soil health card + nutrient recommendations",
    category: "Advisory"
  }
];

const DEMO_ALERTS: Alert[] = [
  { id: 1, type: "weather", severity: "high", title: "Heavy Rainfall Warning", message: "Heavy to very heavy rainfall expected in next 24 hours. Secure equipment and avoid field operations.", time: "2 hours ago", icon: "cloud-rain" },
  { id: 2, type: "pest", severity: "medium", title: "Fall Armyworm Alert", message: "Fall Armyworm infestation reported in neighboring districts. Inspect your maize crops regularly.", time: "5 hours ago", icon: "bug" },
  { id: 3, type: "market", severity: "low", title: "Cotton Prices Declining", message: "Cotton prices have dropped 3.5% this week. Consider holding stock if storage is available.", time: "1 day ago", icon: "trending-down" },
  { id: 4, type: "scheme", severity: "info", title: "PM-KISAN Installment Due", message: "Next PM-KISAN installment disbursement expected within 2 weeks. Ensure your bank account is linked to Aadhaar.", time: "2 days ago", icon: "info" },
];

const DEMO_PROFILE: FarmerProfile = {
  id: "F001",
  name: "Ravi Kumar",
  village: "Pedapudi",
  district: "Guntur",
  state: "Andhra Pradesh",
  phone: "+91 98765 43210",
  farm_size: 3.5,
  soil_type: "Black Cotton Soil",
  current_crops: ["Cotton", "Paddy"],
  irrigation_type: "Drip + Flood",
  preferred_language: "te",
  member_since: "2024-01-15",
  total_recommendations: 47,
  schemes_enrolled: 3
};

const DEMO_STATS: Record<string, number> = {
  farmers_assisted: 12847,
  crop_losses_prevented: 2341,
  languages_supported: 3,
  ai_recommendations: 89432,
  schemes_discovered: 1567,
  diseases_detected: 3892
};

const DEMO_CROP_RECOMMENDATIONS: CropRecommendation[] = [
  {
    crop: "Paddy (Rice)",
    period: "120-150 days",
    water: "High (1200-1800mm)",
    difficulty: "Medium",
    yield: "4-6 tonnes/hectare",
    market_demand: "Very High",
    reason: "Excellent fit for your clay-loam soil and good water availability. Kharif season is ideal timing.",
    icon: "rice"
  },
  {
    crop: "Cotton",
    period: "150-180 days",
    water: "Medium (700-1200mm)",
    difficulty: "High",
    yield: "2-3 tonnes/hectare",
    market_demand: "High",
    reason: "High market value crop suitable for black cotton soil. Your farm size allows mechanized harvesting.",
    icon: "plant"
  },
  {
    crop: "Groundnut",
    period: "90-120 days",
    water: "Low-Medium (500-700mm)",
    difficulty: "Low",
    yield: "2-4 tonnes/hectare",
    market_demand: "High",
    reason: "Drought-tolerant crop ideal as rotation after your previous paddy. Improves soil nitrogen naturally.",
    icon: "groundnut"
  }
];

const DEMO_DISEASE: CropDisease = {
  disease: "Leaf Blight",
  crop: "Rice/Paddy",
  confidence: 87.3,
  severity: "Moderate",
  symptoms: "Yellow to brown lesions on leaves, starting from leaf tips. Lesions expand with water-soaked margins. Affected leaves dry up and die prematurely.",
  prevention: [
    "Use certified disease-free seeds",
    "Maintain proper spacing between plants (20cm x 15cm)",
    "Avoid excess nitrogen fertilizer",
    "Ensure proper drainage in the field",
    "Remove and destroy infected plant debris"
  ],
  treatment: [
    "Apply Propiconazole 25% EC @ 1ml/litre of water",
    "Spray Tricyclazole 75% WP @ 0.6g/litre of water",
    "Repeat spray after 10-14 days if infection persists",
    "Ensure even coverage of entire plant"
  ],
  warning: "Always consult a certified agricultural expert or your local Krishi Vigyan Kendra before applying any pesticide. Follow all safety guidelines on the label."
};

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getWeather: async (location = 'Guntur'): Promise<WeatherData> => {
    try {
      return await fetchJSON<WeatherData>(`${BASE_URL}/weather?location=${encodeURIComponent(location)}`);
    } catch {
      return DEMO_WEATHER;
    }
  },

  getMarket: async () => {
    try {
      return await fetchJSON<{ data: MarketItem[]; last_updated: string; source: string }>(`${BASE_URL}/market`);
    } catch {
      return { data: DEMO_MARKET_DATA, last_updated: new Date().toISOString(), source: "Demo Data (APMC Markets)" };
    }
  },

  getSchemes: async (state = 'Andhra Pradesh') => {
    try {
      return await fetchJSON<{ schemes: GovernmentScheme[]; total: number }>(`${BASE_URL}/schemes?state=${encodeURIComponent(state)}`);
    } catch {
      return { schemes: DEMO_SCHEMES, total: DEMO_SCHEMES.length };
    }
  },

  getAlerts: async () => {
    try {
      return await fetchJSON<{ alerts: Alert[] }>(`${BASE_URL}/alerts`);
    } catch {
      return { alerts: DEMO_ALERTS };
    }
  },

  getFarmerProfile: async (): Promise<FarmerProfile> => {
    try {
      return await fetchJSON<FarmerProfile>(`${BASE_URL}/farmer/profile`);
    } catch {
      return DEMO_PROFILE;
    }
  },

  getStats: async (): Promise<Record<string, number>> => {
    try {
      return await fetchJSON<Record<string, number>>(`${BASE_URL}/stats`);
    } catch {
      return DEMO_STATS;
    }
  },

  chat: async (message: string, language: Language) => {
    try {
      return await fetchJSON<{ response: string; language: string; timestamp: string }>(
        `${BASE_URL}/chat`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, language }),
        }
      );
    } catch {
      const lower = message.toLowerCase();
      let response = "I'm KisanMitra AI, your farming assistant. How can I assist you with your crops or weather today?";
      
      if (language === 'te') {
        response = "Namaskaram! Nenu KisanMitra AI, mee vyavasaya sahayakudu. Panta salaha, vatavarana samacharam, vyadhi gurthimpu, market dharalu mariyu prabhutvam pathakala gurinchi meeku sahayam chesagalanu.";
      } else if (language === 'hi') {
        response = "Namaste! Main KisanMitra AI hoon, aapka kishi sahayak. Main aapko fasal ki salah, mausam ki jankari, bimari ki pehchan aur sarkar ki yojnaon mein madad kar sakta hoon.";
      } else {
        if (lower.includes('rain') || lower.includes('weather')) {
          response = "Based on current weather data, there is a 75% chance of rainfall tomorrow in your area. I recommend postponing any scheduled irrigation and avoiding pesticide spraying today.";
        } else if (lower.includes('disease') || lower.includes('doctor')) {
          response = "To diagnose crop disease accurately, please use the AI Crop Doctor feature and upload a clear photo of the affected leaf or plant.";
        } else if (lower.includes('scheme') || lower.includes('pm')) {
          response = "There are several government schemes available for farmers like PM-KISAN (Rs 6000/year), PMFBY crop insurance, and Kisan Credit Card.";
        } else if (lower.includes('price') || lower.includes('market')) {
          response = "Current market prices: Paddy Rs 2183/quintal, Cotton Rs 6850/quintal, Chilli Rs 14200/quintal. Check the Market Intelligence section for detailed trends.";
        }
      }

      return {
        response,
        language,
        timestamp: new Date().toISOString()
      };
    }
  },

  getCropRecommendation: async (payload: {
    location: string;
    soil_type: string;
    season: string;
    water_availability: string;
    farm_size: number;
    previous_crop?: string;
  }) => {
    try {
      return await fetchJSON<{ recommendations: CropRecommendation[]; location: string; season: string }>(
        `${BASE_URL}/crop-recommendation`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );
    } catch {
      return {
        recommendations: DEMO_CROP_RECOMMENDATIONS,
        location: payload.location,
        season: payload.season,
      };
    }
  },

  analyzeCropDisease: async (file: File) => {
    try {
      const form = new FormData();
      form.append('file', file);
      return await fetchJSON<{ status: string; analysis: CropDisease; demo_mode: boolean }>(
        `${BASE_URL}/crop-disease`,
        { method: 'POST', body: form }
      );
    } catch {
      return {
        status: 'success',
        analysis: DEMO_DISEASE,
        demo_mode: true
      };
    }
  },
};
