import { Bell, User, Globe } from 'lucide-react';
import { useApp } from '../context/AppContext';
import type { Language } from '../types';

const languages: { code: Language; label: string; native: string }[] = [
  { code: 'en', label: 'EN', native: 'English' },
  { code: 'te', label: 'TE', native: 'తెలుగు' },
  { code: 'hi', label: 'HI', native: 'हिंदी' },
];

const pageTitles: Record<string, { title: string; subtitle: string }> = {
  dashboard:     { title: 'Dashboard',              subtitle: 'Welcome back, Ravi Kumar 🌾' },
  weather:       { title: 'Weather Intelligence',    subtitle: 'Real-time forecasts & farm alerts' },
  market:        { title: 'Market Intelligence',     subtitle: 'Live APMC mandi rates & price trends' },
  'crop-doctor': { title: 'AI Crop Doctor',          subtitle: 'Upload a photo for instant disease diagnosis' },
  advisor:       { title: 'Crop Advisor',            subtitle: 'AI-powered crop recommendations' },
  schemes:       { title: 'Government Schemes',      subtitle: 'Discover eligible schemes & subsidies' },
  chat:          { title: 'AI Assistant',            subtitle: 'Multilingual farming assistant — EN / TE / HI' },
  alerts:        { title: 'Farm Alerts',             subtitle: 'Weather, pest, market & scheme alerts' },
  profile:       { title: 'Farmer Profile',          subtitle: 'Manage your farm information' },
  about:         { title: 'About KisanMitra',        subtitle: 'AI-powered agricultural intelligence for every farmer' },
};

export default function Header() {
  const { activeTab, language, setLanguage, setActiveTab } = useApp();
  const page = pageTitles[activeTab] ?? pageTitles['dashboard'];

  return (
    <header className="bg-white border-b border-gray-200 px-4 md:px-6 py-3 flex items-center justify-between flex-shrink-0">
      {/* Title */}
      <div className="ml-10 md:ml-0">
        <h1 className="text-lg font-bold text-gray-900">{page.title}</h1>
        <p className="text-xs text-gray-500 hidden sm:block">{page.subtitle}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        {/* Language switcher */}
        <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
          <Globe className="w-3.5 h-3.5 text-gray-500 ml-1" />
          {languages.map(({ code, label, native }) => (
            <button
              key={code}
              onClick={() => setLanguage(code)}
              title={native}
              className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                language === code
                  ? 'bg-green-600 text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Alerts bell */}
        <button
          onClick={() => setActiveTab('alerts')}
          className="relative p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg"
          aria-label="View alerts"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" aria-hidden="true" />
        </button>

        {/* Avatar / Profile */}
        <button
          onClick={() => setActiveTab('profile')}
          className="flex items-center gap-2 p-1.5 hover:bg-gray-100 rounded-lg"
          aria-label="View profile"
        >
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          <span className="text-sm font-medium text-gray-700 hidden lg:block">Ravi Kumar</span>
        </button>
      </div>
    </header>
  );
}
