import { Leaf, Users, Globe2, Bot, ShieldCheck, Lightbulb, Github, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

const impactMetrics = [
  { label: 'Farmers Assisted', value: '12,847+', icon: Users, color: 'text-green-600 bg-green-100' },
  { label: 'Languages Supported', value: '3', icon: Globe2, color: 'text-blue-600 bg-blue-100' },
  { label: 'AI Recommendations', value: '89,432+', icon: Bot, color: 'text-purple-600 bg-purple-100' },
  { label: 'Crop Losses Prevented', value: '2,341+', icon: ShieldCheck, color: 'text-red-600 bg-red-100' },
  { label: 'Diseases Detected', value: '3,892+', icon: Lightbulb, color: 'text-orange-600 bg-orange-100' },
  { label: 'Schemes Discovered', value: '1,567+', icon: Lightbulb, color: 'text-yellow-600 bg-yellow-100' },
];

const agents = [
  { name: 'Crop Disease Agent', desc: 'Analyzes plant images using computer vision to detect diseases, severity, and recommend treatments.', icon: '🔬' },
  { name: 'Weather Intelligence Agent', desc: 'Fetches real-time meteorological data and translates it into actionable farm recommendations.', icon: '🌦️' },
  { name: 'Crop Recommendation Agent', desc: 'Suggests optimal crops based on soil type, season, water availability, and historical performance.', icon: '🌱' },
  { name: 'Market Intelligence Agent', desc: 'Tracks APMC mandi prices and predicts trends to help farmers decide the best time to sell.', icon: '📊' },
  { name: 'Government Scheme Agent', desc: 'Matches farmer profiles to eligible government schemes and subsidies across central and state programs.', icon: '📋' },
  { name: 'Multilingual Assistant Agent', desc: 'Handles voice and text in Telugu, Hindi, and English using speech-to-text and language models.', icon: '🗣️' },
];

const techStack = [
  { layer: 'Frontend', tech: 'React 18 + TypeScript + Tailwind CSS + Vite' },
  { layer: 'Backend', tech: 'Python FastAPI + Uvicorn + Pydantic' },
  { layer: 'AI / ML', tech: 'LLM API + RAG + Computer Vision + Speech APIs' },
  { layer: 'Database', tech: 'PostgreSQL / Supabase (production)' },
  { layer: 'Auth', tech: 'Phone OTP + Google OAuth' },
  { layer: 'Charts', tech: 'Recharts' },
];

const roadmap = [
  { item: 'Real weather API (OpenWeatherMap / IMD)', done: false },
  { item: 'Live APMC price feeds (Agmarknet API)', done: false },
  { item: 'Computer vision model for crop disease (PlantVillage)', done: false },
  { item: 'Voice input/output in regional languages', done: false },
  { item: 'SMS/WhatsApp integration for low-connectivity', done: false },
  { item: 'Offline PWA support', done: false },
  { item: 'Demo Mode frontend', done: true },
  { item: 'Multilingual AI chat', done: true },
  { item: 'Market price dashboard with trends', done: true },
  { item: 'Government schemes browser', done: true },
];

export default function AboutPage() {
  const { setView, setActiveTab } = useApp();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Hero */}
      <div className="bg-gradient-to-br from-green-700 to-green-500 rounded-2xl p-7 text-white text-center">
        <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Leaf className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-extrabold mb-2">KisanMitra AI</h1>
        <p className="text-green-100 text-sm max-w-md mx-auto">
          An AI-powered multilingual farming assistant built to help small and marginal farmers in India make better decisions — in their language.
        </p>
        <div className="mt-5 inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-full px-4 py-1.5 text-sm text-green-100">
          <span className="w-2 h-2 bg-green-300 rounded-full animate-pulse" />
          Demo Mode Active — All data is simulated
        </div>
      </div>

      {/* Impact */}
      <div>
        <h2 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Heart className="w-4 h-4 text-red-500" /> Social Impact
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {impactMetrics.map(m => (
            <div key={m.label} className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 text-center">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center mx-auto mb-2 ${m.color}`}>
                <m.icon className="w-4 h-4" />
              </div>
              <div className="text-xl font-bold text-gray-900">{m.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{m.label}</div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">All metrics are demo data to illustrate potential platform impact.</p>
      </div>

      {/* Mission */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-3">The Problem We Solve</h2>
        <p className="text-sm text-gray-600 leading-relaxed mb-4">
          India has 86% small and marginal farmers who manage over 47% of the cultivated land, yet face massive information gaps. They make high-stakes decisions — what to plant, when to irrigate, whether to sell today or wait — with little access to timely agricultural intelligence.
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          KisanMitra AI bridges this gap by putting AI-powered agricultural intelligence directly in the hands of every farmer, in their own language, on any basic smartphone.
        </p>
      </div>

      {/* AI Architecture */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-1">AI Agent Architecture</h2>
        <p className="text-xs text-gray-500 mb-4">Modular design — each agent can be independently upgraded or replaced.</p>
        <div className="space-y-3">
          {agents.map(a => (
            <div key={a.name} className="flex gap-3 p-3 bg-gray-50 rounded-xl">
              <span className="text-2xl flex-shrink-0">{a.icon}</span>
              <div>
                <div className="text-sm font-semibold text-gray-900">{a.name}</div>
                <div className="text-xs text-gray-500 mt-0.5">{a.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tech Stack */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
          <Github className="w-4 h-4" /> Technology Stack
        </h2>
        <div className="space-y-2">
          {techStack.map(t => (
            <div key={t.layer} className="flex gap-3 text-sm">
              <span className="w-24 font-semibold text-gray-700 flex-shrink-0">{t.layer}</span>
              <span className="text-gray-500">{t.tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Roadmap */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h2 className="font-bold text-gray-900 mb-3">Product Roadmap</h2>
        <div className="space-y-2">
          {roadmap.map(r => (
            <div key={r.item} className={`flex items-start gap-2.5 text-sm ${r.done ? 'text-green-700' : 'text-gray-600'}`}>
              <span className="mt-0.5 flex-shrink-0">
                {r.done ? '✅' : '⬜'}
              </span>
              <span>{r.item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Safety disclaimer */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5 text-sm text-yellow-800">
        <div className="font-semibold mb-1">⚠️ Important Safety Notice</div>
        <p>
          KisanMitra AI provides informational and advisory outputs only. All AI-generated crop, chemical, financial, and legal recommendations should be verified with qualified agricultural experts before acting. Market prices are indicative and may vary. Government scheme eligibility should be confirmed with official sources.
        </p>
      </div>

      {/* Back to app */}
      <div className="text-center pb-4">
        <button
          onClick={() => { setView('app'); setActiveTab('dashboard'); }}
          className="bg-green-600 text-white font-semibold px-6 py-3 rounded-xl hover:bg-green-700 transition-colors"
        >
          Back to Dashboard
        </button>
        <p className="text-xs text-gray-400 mt-3">Built for Bharat's farmers. Jai Kisan! 🙏</p>
      </div>
    </div>
  );
}
