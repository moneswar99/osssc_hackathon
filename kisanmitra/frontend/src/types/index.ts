export interface WeatherData {
  location: string;
  temperature: number;
  humidity: number;
  rain_probability: number;
  wind_speed: number;
  condition: string;
  soil_moisture: string;
  forecast: ForecastDay[];
  ai_recommendations: WeatherRecommendation[];
}

export interface ForecastDay {
  day: string;
  high: number;
  low: number;
  condition: string;
  rain: number;
  icon: string;
}

export interface WeatherRecommendation {
  type: 'warning' | 'alert' | 'info' | 'success';
  message: string;
}

export interface MarketItem {
  crop: string;
  current_price: number;
  previous_price: number;
  trend: 'up' | 'down' | 'stable';
  market: string;
  unit: string;
  best_time: string;
  change_percent: number;
}

export interface GovernmentScheme {
  name: string;
  purpose: string;
  eligibility: string;
  documents: string[];
  application: string;
  link: string;
  ministry: string;
  benefit: string;
  category: string;
}

export interface CropDisease {
  disease: string;
  crop: string;
  confidence: number;
  severity: string;
  symptoms: string;
  prevention: string[];
  treatment: string[];
  warning: string;
}

export interface Alert {
  id: number;
  type: string;
  severity: 'high' | 'medium' | 'low' | 'info';
  title: string;
  message: string;
  time: string;
  icon: string;
}

export interface FarmerProfile {
  id: string;
  name: string;
  village: string;
  district: string;
  state: string;
  phone: string;
  farm_size: number;
  soil_type: string;
  current_crops: string[];
  irrigation_type: string;
  preferred_language: string;
  member_since: string;
  total_recommendations: number;
  schemes_enrolled: number;
}

export type Language = 'en' | 'te' | 'hi';

export type AppView = 'landing' | 'app';
