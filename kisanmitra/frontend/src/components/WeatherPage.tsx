import React, { useEffect, useState } from 'react';
import { Droplets, Wind, CloudRain, Sun, Cloud, CheckCircle, AlertTriangle, Info, XCircle } from 'lucide-react';
import { api } from '../services/api';
import type { WeatherData, WeatherRecommendation } from '../types';

function WeatherIcon({ icon, className = 'w-6 h-6' }: { icon: string; className?: string }) {
  switch (icon) {
    case 'sun':        return <Sun className={className} />;
    case 'cloud':      return <Cloud className={className} />;
    case 'cloud-rain': return <CloudRain className={className} />;
    default:           return <Cloud className={className} />;
  }
}

const recStyles: Record<WeatherRecommendation['type'], { bg: string; icon: React.ReactNode }> = {
  warning: { bg: 'bg-yellow-50 border-yellow-300 text-yellow-800', icon: <AlertTriangle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" /> },
  alert:   { bg: 'bg-red-50 border-red-300 text-red-800',          icon: <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" /> },
  info:    { bg: 'bg-blue-50 border-blue-300 text-blue-800',        icon: <Info className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" /> },
  success: { bg: 'bg-green-50 border-green-300 text-green-800',     icon: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" /> },
};

export default function WeatherPage() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.getWeather().then(setWeather).catch(() => null).finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="flex items-center justify-center h-64 text-gray-500">Loading weather data…</div>;
  if (!weather) return <div className="text-red-500 text-center">Failed to load weather data.</div>;

  return (
    <div className="space-y-6">
      {/* Current conditions */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-400 rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-blue-100 text-sm">{weather.location}</div>
            <div className="text-6xl font-bold">{weather.temperature}°C</div>
            <div className="text-blue-100 mt-1">{weather.condition}</div>
          </div>
          <CloudRain className="w-20 h-20 text-blue-200 opacity-80" />
        </div>
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-blue-400/50">
          <div className="text-center">
            <Droplets className="w-5 h-5 mx-auto mb-1 text-blue-200" />
            <div className="text-lg font-bold">{weather.humidity}%</div>
            <div className="text-xs text-blue-200">Humidity</div>
          </div>
          <div className="text-center">
            <CloudRain className="w-5 h-5 mx-auto mb-1 text-blue-200" />
            <div className="text-lg font-bold">{weather.rain_probability}%</div>
            <div className="text-xs text-blue-200">Rain Chance</div>
          </div>
          <div className="text-center">
            <Wind className="w-5 h-5 mx-auto mb-1 text-blue-200" />
            <div className="text-lg font-bold">{weather.wind_speed}</div>
            <div className="text-xs text-blue-200">Wind km/h</div>
          </div>
        </div>
      </div>

      {/* 7-day forecast */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">7-Day Forecast</h3>
        <div className="grid grid-cols-7 gap-2">
          {weather.forecast.map((day) => (
            <div key={day.day} className="bg-white rounded-xl p-3 text-center shadow-sm border border-gray-100">
              <div className="text-xs font-medium text-gray-600 mb-2">{day.day}</div>
              <WeatherIcon icon={day.icon} className="w-5 h-5 mx-auto text-blue-500 mb-2" />
              <div className="text-sm font-bold text-gray-900">{day.high}°</div>
              <div className="text-xs text-gray-400">{day.low}°</div>
              <div className="text-xs text-blue-500 mt-1">{day.rain}%</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI recommendations */}
      <div>
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">AI Farm Recommendations</h3>
        <div className="space-y-2">
          {weather.ai_recommendations.map((rec, i) => {
            const style = recStyles[rec.type];
            return (
              <div key={i} className={`border rounded-xl p-4 flex gap-3 ${style.bg}`}>
                {style.icon}
                <p className="text-sm">{rec.message}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
