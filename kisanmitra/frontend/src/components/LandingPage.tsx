import { useState } from 'react';
import {
  Leaf, ArrowRight, CloudRain, TrendingUp, Stethoscope,
  FileText, MessageSquare, Mic, Star, Users, ShieldCheck,
  Globe2, Bot, ChevronRight, Phone
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const stats = [
  { label: 'Farmers Assisted', value: '12,847+', icon: Users },
  { label: 'Languages', value: '3', icon: Globe2 },
  { label: 'AI Recommendations', value: '89,432+', icon: Bot },
  { label: 'Diseases Detected', value: '3,892+', icon: ShieldCheck },
];

const features = [
  {
    icon: CloudRain,
    title: 'Weather Intelligence',
    desc: '7-day forecast with AI-powered farm recommendations. Know exactly when to irrigate, spray, or harvest.',
    color: 'bg-blue-500',
  },
  {
    icon: Stethoscope,
    title: 'AI Crop Doctor',
    desc: 'Upload a photo of your crop. AI detects diseases instantly with treatment and prevention steps.',
    color: 'bg-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Market Intelligence',
    desc: 'Live APMC mandi rates for paddy, cotton, chilli and more. Know the best time to sell.',
    color: 'bg-emerald-500',
  },
  {
    icon: FileText,
    title: 'Government Schemes',
    desc: 'Discover PM-KISAN, PMFBY, KCC and 50+ schemes you qualify for. Never miss free money.',
    color: 'bg-purple-500',
  },
  {
    icon: MessageSquare,
    title: 'Multilingual AI Chat',
    desc: 'Ask anything in Telugu, Hindi, or English. Get instant answers from KisanMitra AI assistant.',
    color: 'bg-orange-500',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    desc: 'Speak in your language. No typing needed. Perfect for farmers with limited digital literacy.',
    color: 'bg-pink-500',
  },
];

const testimonials = [
  {
    name: 'Ravi Kumar',
    location: 'Guntur, AP',
    text: 'KisanMitra told me about the heavy rain 2 days in advance. I saved my entire cotton crop from lodging damage.',
    rating: 5,
    crop: 'Cotton Farmer',
  },
  {
    name: 'Lakshmi Devi',
    location: 'Warangal, TS',
    text: 'I found out about Rythu Bandhu scheme through this app. Got Rs 10,000 per acre support for my paddy field.',
    rating: 5,
    crop: 'Paddy Farmer',
  },
  {
    name: 'Suresh Reddy',
    location: 'Kurnool, AP',
    text: 'The AI Crop Doctor detected leaf blight on my groundnut. The treatment steps worked perfectly.',
    rating: 5,
    crop: 'Groundnut Farmer',
  },
];

export default function LandingPage() {
  const { setView, setActiveTab } = useApp();
  const [phone, setPhone] = useState('');
  const [loginStep, setLoginStep] = useState<'phone' | 'otp' | null>(null);
  const [otp, setOtp] = useState('');

  const enterApp = () => {
    setView('app');
    setActiveTab('dashboard');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginStep === 'phone') {
      setLoginStep('otp');
    } else {
      // Demo: accept any OTP
      enterApp();
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="font-bold text-gray-900 leading-tight">KisanMitra AI</div>
              <div className="text-xs text-gray-500 hidden sm:block">Smart Farming Assistant</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLoginStep('phone')}
              className="text-sm font-medium text-gray-700 hover:text-green-700 transition-colors hidden sm:block"
            >
              Sign In
            </button>
            <button
              onClick={enterApp}
              className="bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-xl hover:bg-green-700 transition-colors"
            >
              Try Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-green-800 to-green-600 text-white">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '32px 32px' }}
        />
        <div className="relative max-w-6xl mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-green-700/50 border border-green-500/30 rounded-full px-4 py-1.5 text-sm text-green-200 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                AI-Powered • Multilingual • Free
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4 text-balance">
                AI That Helps Every Farmer Make a Better Decision.
              </h1>
              <p className="text-green-100 text-lg mb-8 leading-relaxed">
                Crop intelligence, weather alerts, disease detection, market insights and government-scheme assistance — in your language.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <button
                  onClick={enterApp}
                  className="flex items-center justify-center gap-2 bg-white text-green-800 font-bold px-6 py-3.5 rounded-xl hover:bg-green-50 transition-colors text-base shadow-lg"
                >
                  Start Farming Smarter <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => { enterApp(); setActiveTab('crop-doctor'); }}
                  className="flex items-center justify-center gap-2 bg-green-700 border border-green-500 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-600 transition-colors text-base"
                >
                  <Stethoscope className="w-4 h-4" /> Try AI Crop Doctor
                </button>
              </div>
              {/* Language chips */}
              <div className="flex items-center gap-2 text-sm text-green-200">
                <Globe2 className="w-4 h-4" />
                <span>Available in:</span>
                {['English', 'తెలుగు', 'हिंदी'].map(l => (
                  <span key={l} className="bg-green-700/50 border border-green-600/40 px-2 py-0.5 rounded-full text-xs">{l}</span>
                ))}
              </div>
            </div>

            {/* Dashboard Preview Card */}
            <div className="hidden md:block">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-4 border border-white/20 shadow-2xl">
                <div className="bg-white rounded-xl overflow-hidden shadow-lg">
                  {/* Mock header */}
                  <div className="bg-green-700 px-4 py-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Leaf className="w-4 h-4 text-white" />
                      <span className="text-white text-xs font-semibold">KisanMitra AI</span>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-red-400" />
                      <div className="w-2 h-2 rounded-full bg-yellow-400" />
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                  </div>
                  {/* Mock dashboard content */}
                  <div className="p-4 space-y-3 bg-gray-50">
                    {/* Weather card mock */}
                    <div className="bg-gradient-to-r from-blue-500 to-blue-400 rounded-xl p-3 text-white">
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="text-xs opacity-80">Guntur, AP</div>
                          <div className="text-2xl font-bold">34°C</div>
                          <div className="text-xs opacity-80">Rain: 75% chance</div>
                        </div>
                        <CloudRain className="w-10 h-10 opacity-70" />
                      </div>
                    </div>
                    {/* Stats mock */}
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Humidity', val: '68%', c: 'bg-blue-50' },
                        { label: 'Wind', val: '12 km/h', c: 'bg-green-50' },
                        { label: 'Soil', val: 'Good', c: 'bg-yellow-50' },
                      ].map(s => (
                        <div key={s.label} className={`${s.c} rounded-lg p-2 text-center`}>
                          <div className="text-xs font-bold text-gray-800">{s.val}</div>
                          <div className="text-xs text-gray-500">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    {/* Alert mock */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 flex gap-2 items-start">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full mt-1 flex-shrink-0" />
                      <div className="text-xs text-yellow-800">Heavy rain tomorrow. Avoid irrigation today.</div>
                    </div>
                    {/* Market mock */}
                    <div className="bg-white rounded-lg p-2 border border-gray-100">
                      <div className="text-xs font-semibold text-gray-700 mb-1">Market Prices</div>
                      {[
                        { crop: 'Cotton', price: '₹6,850', up: false },
                        { crop: 'Paddy', price: '₹2,183', up: true },
                      ].map(m => (
                        <div key={m.crop} className="flex justify-between items-center text-xs py-0.5">
                          <span className="text-gray-600">{m.crop}</span>
                          <span className={`font-bold ${m.up ? 'text-green-600' : 'text-red-500'}`}>{m.price} {m.up ? '↑' : '↓'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-3 text-xs text-green-200 opacity-70">Demo Preview</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-green-700 py-6">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map(({ label, value, icon: Icon }) => (
              <div key={label} className="text-center text-white">
                <Icon className="w-6 h-6 mx-auto mb-1 text-green-300" />
                <div className="text-2xl font-extrabold">{value}</div>
                <div className="text-green-200 text-xs">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Everything a Farmer Needs</h2>
            <p className="text-gray-500 max-w-xl mx-auto">Six powerful AI tools working together to help you grow more, earn more, and lose less.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f) => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                <div className={`w-11 h-11 ${f.color} rounded-xl flex items-center justify-center mb-4`}>
                  <f.icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Simple. Fast. In Your Language.</h2>
          <p className="text-gray-500 mb-10">Designed for farmers with limited digital literacy. Large buttons, simple language, voice support.</p>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { step: '1', title: 'Open KisanMitra', desc: 'Works on any smartphone. No installation needed. Just open in your browser.' },
              { step: '2', title: 'Choose Your Language', desc: 'Switch between English, Telugu, and Hindi anytime from the top bar.' },
              { step: '3', title: 'Ask, Upload, or Explore', desc: 'Chat in your language, upload crop photos, or browse market prices and schemes.' },
            ].map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-14 h-14 bg-green-600 text-white text-xl font-extrabold rounded-full flex items-center justify-center mx-auto mb-4">{s.step}</div>
                <h4 className="font-bold text-gray-900 mb-2">{s.title}</h4>
                <p className="text-sm text-gray-500">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-4 bg-green-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-2">What Farmers Say</h2>
          <p className="text-center text-gray-500 mb-10 text-sm">Real stories from farmers across Andhra Pradesh and Telangana.</p>
          <div className="grid sm:grid-cols-3 gap-5">
            {testimonials.map((t) => (
              <div key={t.name} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                <div className="flex gap-1 mb-3">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-700 italic mb-4">"{t.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900 text-sm">{t.name}</div>
                  <div className="text-xs text-gray-500">{t.crop} · {t.location}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA / Login Section */}
      <section className="py-16 px-4 bg-gradient-to-br from-green-800 to-green-600 text-white" id="login">
        <div className="max-w-lg mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-3">Join 12,000+ Farmers</h2>
          <p className="text-green-200 mb-8">Get free access to AI crop advice, weather alerts, and government schemes.</p>

          {!loginStep ? (
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => setLoginStep('phone')}
                className="flex items-center justify-center gap-2 bg-white text-green-800 font-bold px-6 py-3.5 rounded-xl hover:bg-green-50 transition-colors"
              >
                <Phone className="w-4 h-4" /> Login with Phone
              </button>
              <button
                onClick={enterApp}
                className="flex items-center justify-center gap-2 bg-green-700 border border-green-500 text-white font-semibold px-6 py-3.5 rounded-xl hover:bg-green-600 transition-colors"
              >
                Explore Demo <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="bg-white/10 backdrop-blur border border-white/20 rounded-2xl p-6 text-left">
              {loginStep === 'phone' ? (
                <div>
                  <label className="block text-sm font-medium text-green-100 mb-2">Mobile Number</label>
                  <div className="flex gap-2">
                    <span className="bg-white/20 border border-white/30 rounded-xl px-3 py-3 text-sm text-white font-medium">+91</span>
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="9876543210"
                      className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
                      maxLength={10}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full mt-3 bg-white text-green-800 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    Send OTP
                  </button>
                  <button type="button" onClick={enterApp} className="w-full mt-2 text-green-200 text-sm hover:text-white transition-colors">
                    Skip — Try Demo Instead
                  </button>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-green-100 mb-2">Enter OTP sent to +91 {phone}</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    placeholder="Enter 6-digit OTP"
                    className="w-full bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/50 text-sm focus:outline-none focus:ring-2 focus:ring-white/50 text-center text-xl tracking-widest"
                    maxLength={6}
                  />
                  <p className="text-xs text-green-200 mt-2 text-center">Demo: enter any 6 digits</p>
                  <button
                    type="submit"
                    className="w-full mt-3 bg-white text-green-800 font-bold py-3 rounded-xl hover:bg-green-50 transition-colors"
                  >
                    Verify & Enter App
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-green-600 rounded-xl flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold">KisanMitra AI</div>
                <div className="text-xs">AI-Powered Farming Assistant</div>
              </div>
            </div>
            <div className="text-sm text-center">
              Built for Bharat's farmers. <span className="text-green-400">Jai Kisan! 🙏</span>
            </div>
            <div className="flex gap-4 text-sm">
              {['About', 'Privacy', 'Contact'].map(l => (
                <button key={l} onClick={enterApp} className="hover:text-white transition-colors">{l}</button>
              ))}
            </div>
          </div>
          <div className="border-t border-gray-800 mt-6 pt-6 text-xs text-center text-gray-600">
            AI outputs are advisory only. Always verify agricultural, financial, and legal decisions with qualified experts.
            Platform statistics are demo data for illustration purposes.
          </div>
        </div>
      </footer>

      {/* Login Modal */}
      {loginStep && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 md:hidden">
          {/* handled inline above for mobile */}
        </div>
      )}
    </div>
  );
}
