import type {
  WeatherData,
  MarketItem,
  GovernmentScheme,
  CropDisease,
  Alert,
  FarmerProfile,
  Language,
} from '../types';

const BASE_URL = '/api';

async function fetchJSON<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getWeather: (location = 'Guntur') =>
    fetchJSON<WeatherData>(`${BASE_URL}/weather?location=${encodeURIComponent(location)}`),

  getMarket: () =>
    fetchJSON<{ data: MarketItem[]; last_updated: string; source: string }>(
      `${BASE_URL}/market`
    ),

  getSchemes: (state = 'Andhra Pradesh') =>
    fetchJSON<{ schemes: GovernmentScheme[]; total: number }>(
      `${BASE_URL}/schemes?state=${encodeURIComponent(state)}`
    ),

  getAlerts: () =>
    fetchJSON<{ alerts: Alert[] }>(`${BASE_URL}/alerts`),

  getFarmerProfile: () =>
    fetchJSON<FarmerProfile>(`${BASE_URL}/farmer/profile`),

  getStats: () =>
    fetchJSON<Record<string, number>>(`${BASE_URL}/stats`),

  chat: (message: string, language: Language) =>
    fetchJSON<{ response: string; language: string; timestamp: string }>(
      `${BASE_URL}/chat`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language }),
      }
    ),

  getCropRecommendation: (payload: {
    location: string;
    soil_type: string;
    season: string;
    water_availability: string;
    farm_size: number;
    previous_crop?: string;
  }) =>
    fetchJSON<{ recommendations: unknown[]; location: string; season: string }>(
      `${BASE_URL}/crop-recommendation`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      }
    ),

  analyzeCropDisease: (file: File) => {
    const form = new FormData();
    form.append('file', file);
    return fetchJSON<{ status: string; analysis: CropDisease; demo_mode: boolean }>(
      `${BASE_URL}/crop-disease`,
      { method: 'POST', body: form }
    );
  },
};
