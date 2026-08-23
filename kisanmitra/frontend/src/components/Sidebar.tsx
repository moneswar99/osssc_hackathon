import { useState } from 'react';
import {
  LayoutDashboard, Cloud, TrendingUp, Stethoscope,
  FileText, MessageSquare, Sprout, Menu, X, Leaf,
  Bell, User, Info, LogOut
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { id: 'dashboard',   label: 'Dashboard',      icon: LayoutDashboard },
  { id: 'weather',     label: 'Weather',         icon: Cloud },
  { id: 'market',      label: 'Market Prices',   icon: TrendingUp },
  { id: 'crop-doctor', label: 'AI Crop Doctor',  icon: Stethoscope },
  { id: 'advisor',     label: 'Crop Advisor',    icon: Sprout },
  { id: 'schemes',     label: 'Gov. Schemes',    icon: FileText },
  { id: 'chat',        label: 'AI Assistant',    icon: MessageSquare },
  { id: 'alerts',      label: 'Alerts',          icon: Bell },
  { id: 'profile',     label: 'My Profile',      icon: User },
  { id: 'about',       label: 'About',           icon: Info },
];

export default function Sidebar() {
  const { activeTab, setActiveTab, setView } = useApp();
  const [open, setOpen] = useState(false);

  const NavContent = () => (
    <>
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-green-700 select-none pointer-events-none">
        <div className="w-9 h-9 bg-yellow-400 rounded-full flex items-center justify-center flex-shrink-0">
          <Leaf className="w-5 h-5 text-green-900" />
        </div>
        <div>
          <div className="text-white font-bold text-base leading-tight">KisanMitra</div>
          <div className="text-green-300 text-xs">AI Farming Assistant</div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto select-none">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => { setActiveTab(id); setOpen(false); }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
              activeTab === id
                ? 'bg-green-600 text-white'
                : 'text-green-100 hover:bg-green-700 hover:text-white'
            }`}
          >
            <Icon className="w-4 h-4 flex-shrink-0" />
            <span className="select-none">{label}</span>
            {id === 'alerts' && (
              <span className="ml-auto w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold select-none">4</span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-4 border-t border-green-700 space-y-2 select-none">
        <div className="bg-green-700 rounded-lg p-3 text-xs text-green-200 text-center cursor-default">
          <div className="font-semibold text-white mb-0.5 flex items-center justify-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 inline-block flex-shrink-0" aria-hidden="true" />
            Demo Mode
          </div>
          Connect backend for live AI
        </div>
        <button
          onClick={() => setView('landing')}
          className="w-full flex items-center gap-2 px-3 py-2 text-green-300 hover:text-white hover:bg-green-700 rounded-lg text-xs transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Back to Landing</span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile hamburger */}
      <button
        onClick={() => setOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-green-800 text-white rounded-lg shadow-lg"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Mobile overlay */}
      {open && (
        <div
          className="md:hidden fixed inset-0 z-40 bg-black/50"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobile drawer */}
      <aside
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-green-800 flex flex-col transform transition-transform duration-200 select-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Navigation"
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-green-200 hover:text-white"
          aria-label="Close menu"
        >
          <X className="w-5 h-5" />
        </button>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className="hidden md:flex md:flex-col md:w-60 bg-green-800 flex-shrink-0 select-none" aria-label="Navigation">
        <NavContent />
      </aside>
    </>
  );
}
