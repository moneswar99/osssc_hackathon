import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Language, FarmerProfile, AppView } from '../types';

interface AppContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
  profile: FarmerProfile | null;
  setProfile: (p: FarmerProfile | null) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  view: AppView;
  setView: (v: AppView) => void;
}

const AppContext = createContext<AppContextValue | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageSt] = useState<Language>('en');
  const [profile, setProfile] = useState<FarmerProfile | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [view, setView] = useState<AppView>('landing');

  const setLanguage = useCallback((lang: Language) => setLanguageSt(lang), []);

  return (
    <AppContext.Provider value={{ language, setLanguage, profile, setProfile, activeTab, setActiveTab, view, setView }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}
