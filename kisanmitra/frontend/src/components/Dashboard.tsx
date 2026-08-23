import React, { useEffect, useState } from 'react';
import {
  Users, ShieldCheck, Globe2, Bot, Lightbulb, Microscope,
  CloudRain, TrendingDown, Info, AlertTriangle, ArrowRight,
  Thermometer, Droplets, Wind, Sprout, MapPin
} from 'lucide-react';
import { api } from '../services/api';
import { useApp } from '../context/AppContext';
import type { Alert, WeatherData } from '../types';

interface Stat {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

const severityStyles: Record<string, string> = {
  high:   'border-l-red-500 bg-red-50',
  medium: 'border-l-orange-500 bg-orange-50',
  low:    'border-l-blue-500 bg-blue-50',
  info:   'border-l-green-500 bg-green-50',
};

const severityIconColor: Record<string, string> = {
  high:   'text-red-500',
  medium: 'text-orange-500',
  low:    'text-blue-500',
  info:   'text-green-500',
};

function AlertIconComp({ icon }: { icon: string }) {
  switch (icon) {
    case 'cloud-rain':    return <CloudRain className="w-4 h-4" />;
    case 'bug':           return <AlertTriangle className="w-4 h-4" />;
    case 'trending-down': return <TrendingDown className="w-4 h-4" />;
    default:              return <Info className="w-4 h-4" />;
  }
}

export default function Dashboard() {
  const { setActiveTab, language } = useApp();
  const [stats, setStats] = useState<Record<string, number>>({});
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.getStats(), api.getAlerts(), api.getWeather()])
      .then(([s, a, w]) => {
        setStats(s);
        setAlerts(a.alerts.slice(0, 3));
        setWeather(w);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const statCards: Stat[] = [
    {
      label: 'Farmers Assisted',
      value: stats.farmers_assisted?.toLocaleString('en-IN') ?? '12,847',
      icon: <Users className="w-5 h-5" />,
      color: 'bg-green-100 text-green-700',
    },
    {
      label: 'Crop Losses Prevented',
      value: stats.crop_losses_prevented?.toLocaleString('en-IN') ?? '2,341',
      icon: <ShieldCheck className="w-5 h-5" />,
      color: 'bg-blue-100 text-blue-700',
    },
    {
      label: 'Languages Supported',
      value: String(stats.languages_supported ?? 3),
      icon: <Globe2 className="w-5 h-5" />,
      color: 'bg-purple-100 text-purple-700',
    },
    {
      label: 'AI Recommendations',
      value: stats.ai_recommendations?.toLocaleString('en-IN') ?? '89,432',
      icon: <Bot className="w-5 h-5" />,
      color: 'bg-yellow-100 text-yellow-700',
    },
    {
      label: 'Schemes Discovered',
      value: stats.schemes_discovered?.toLocaleString('en-IN') ?? '1,567',
      icon: <Lightbulb className="w-5 h-5" />,
      color: 'bg-orange-100 text-orange-700',
    },
    {
      label: 'Diseases Detected',
      value: stats.diseases_detected?.toLocaleString('en-IN') ?? '3,892',
      icon: <Microscope className="w-5 h-5" />,
      color: 'bg-red-100 text-red-700',
    },
  ];

  const quickLinks = [
    { id: 'weather',     label: 'Check Weather',       desc: '7-day forecast',              color: 'bg-blue-600',   emoji: '🌦️' },
    { id: 'market',      label: 'Market Prices',        desc: 'Live APMC rates',             color: 'bg-emerald-600', emoji: '📊' },
    { id: 'crop-doctor', label: 'Crop Doctor',          desc: 'Upload photo & detect',       color: 'bg-red-600',    emoji: '🔬' },
    { id: 'schemes',     label: 'Gov. Schemes',         desc: 'Find your eligibility',       color: 'bg-purple-600', emoji: '📋' },
    { id: 'advisor',     label: 'Crop Advisor',         desc: 'What to plant this season',   color: 'bg-yellow-600', emoji: '🌱' },
    { id: 'chat',        label: 'AI Chat',              desc: 'Ask in Telugu/Hindi/English', color: 'bg-pink-600',   emoji: '💬' },
  ];

  const greetings: Record<string, string> = {
    en: 'Jai Kisan! 🌾',
    te: 'జై కిసాన్! 🌾',
    hi: 'जय किसान! 🌾',
  };

  return (
    <div className="space-y-6">
      {/* Hero banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-500 rounded-2xl p-5 md:p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h2 className="text-xl md:text-2xl font-bold mb-1">{greetings[language] ?? greetings.en}</h2>
            <p className="text-green-100 text-sm max-w-lg mb-3">
              Your AI-powered farming companion. Get crop advice, weather alerts, disease detection, and market insights — all in one place.
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab('chat')}
                className="bg-white text-green-700 font-semibold text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-50 transition-colors"
              >
                Ask KisanMitra AI <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('crop-doctor')}
                className="bg-green-600 border border-green-400 text-white font-medium text-sm px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-500 transition-colors"
              >
                Upload Crop Photo
              </button>
            </div>
          </div>
          <div className="text-6xl hidden sm:block ml-4">🧑‍🌾</div>
        </div>
      </div>

      {/* Weather widget + farmer info row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Weather mini card */}
        <button
          onClick={() => setActiveTab('weather')}
          className="bg-gradient-to-br from-blue-500 to-blue-400 rounded-2xl p-4 text-white text-left hover:opacity-95 transition-opacity"
        >
          <div className="flex items-center gap-2 text-blue-100 text-xs mb-2">
            <MapPin className="w-3 h-3" />
            {weather?.location ?? 'Guntur, Andhra Pradesh'}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-3xl font-extrabold">{weather?.temperature ?? 34}°C</div>
              <div className="text-blue-100 text-sm">{weather?.condition ?? 'Partly Cloudy'}</div>
            </div>
            <CloudRain className="w-10 h-10 text-blue-200" />
          </div>
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-blue-400/40 text-center">
            <div>
              <Droplets className="w-3.5 h-3.5 mx-auto text-blue-200 mb-0.5" />
              <div className="text-sm font-bold">{weather?.humidity ?? 68}%</div>
              <div className="text-xs text-blue-200">Humid</div>
            </div>
            <div>
              <CloudRain className="w-3.5 h-3.5 mx-auto text-blue-200 mb-0.5" />
              <div className="text-sm font-bold">{weather?.rain_probability ?? 75}%</div>
              <div className="text-xs text-blue-200">Rain</div>
            </div>
            <div>
              <Wind className="w-3.5 h-3.5 mx-auto text-blue-200 mb-0.5" />
              <div className="text-sm font-bold">{weather?.wind_speed ?? 12}</div>
              <div className="text-xs text-blue-200">km/h</div>
            </div>
          </div>
        </button>

        {/* Farm info card */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <Sprout className="w-4 h-4 text-green-600" /> My Farm — Ravi Kumar
          </h3>
          <div className="space-y-2">
            {[
              { label: 'Location', value: 'Pedapudi, Guntur', icon: MapPin },
              { label: 'Current Crops', value: 'Cotton, Paddy', icon: Sprout },
              { label: 'Farm Size', value: '3.5 acres', icon: Thermometer },
              { label: 'Soil', value: 'Black Cotton Soil', icon: Layers },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </div>
                <span className="font-medium text-gray-800 text-right text-xs">{value}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setActiveTab('profile')}
            className="mt-3 text-xs text-green-700 font-medium hover:text-green-800 flex items-center gap-1"
          >
            Edit Profile <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Stats */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Platform Impact <span className="text-yellow-600">(Demo Data)</span></h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {statCards.map(s => (
            <div key={s.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-2 ${s.color}`}>
                {s.icon}
              </div>
              <div className="text-xl font-bold text-gray-900">{loading ? '…' : s.value}</div>
              <div className="text-xs text-gray-500 mt-0.5 leading-tight">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick access */}
      <div>
        <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Quick Access</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {quickLinks.map(q => (
            <button
              key={q.id}
              onClick={() => setActiveTab(q.id)}
              className={`${q.color} text-white rounded-xl p-4 text-left hover:opacity-90 transition-opacity shadow-sm`}
            >
              <div className="text-2xl mb-1">{q.emoji}</div>
              <div className="font-semibold text-sm">{q.label}</div>
              <div className="text-xs text-white/70 mt-0.5">{q.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Recent Alerts</h3>
          <button
            onClick={() => setActiveTab('alerts')}
            className="text-xs text-green-700 font-medium hover:text-green-800 flex items-center gap-1"
          >
            View All <ArrowRight className="w-3 h-3" />
          </button>
        </div>
        <div className="space-y-2">
          {alerts.length === 0 && !loading && (
            <p className="text-gray-500 text-sm">No recent alerts.</p>
          )}
          {alerts.map(alert => (
            <div
              key={alert.id}
              className={`border-l-4 rounded-r-xl p-4 flex gap-3 ${severityStyles[alert.severity]}`}
            >
              <span className={`mt-0.5 flex-shrink-0 ${severityIconColor[alert.severity]}`}>
                <AlertIconComp icon={alert.icon} />
              </span>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900">{alert.title}</div>
                <div className="text-xs text-gray-600 mt-0.5">{alert.message}</div>
                <div className="text-xs text-gray-400 mt-1">{alert.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Inline Layers icon since we need it
function Layers({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  );
}
