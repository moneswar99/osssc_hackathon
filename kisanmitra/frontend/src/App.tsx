import { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import LandingPage from './components/LandingPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import WeatherPage from './components/WeatherPage';
import MarketPage from './components/MarketPage';
import CropDoctorPage from './components/CropDoctorPage';
import SchemesPage from './components/SchemesPage';
import ChatPage from './components/ChatPage';
import CropAdvisorPage from './components/CropAdvisorPage';
import ProfilePage from './components/ProfilePage';
import AlertsPage from './components/AlertsPage';
import AboutPage from './components/AboutPage';
import { api } from './services/api';

function AppInner() {
  const { activeTab, setProfile, view } = useApp();

  useEffect(() => {
    api.getFarmerProfile().then(setProfile).catch(() => null);
  }, [setProfile]);

  if (view === 'landing') {
    return <LandingPage />;
  }

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':   return <Dashboard />;
      case 'weather':     return <WeatherPage />;
      case 'market':      return <MarketPage />;
      case 'crop-doctor': return <CropDoctorPage />;
      case 'schemes':     return <SchemesPage />;
      case 'chat':        return <ChatPage />;
      case 'advisor':     return <CropAdvisorPage />;
      case 'alerts':      return <AlertsPage />;
      case 'profile':     return <ProfilePage />;
      case 'about':       return <AboutPage />;
      default:            return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}
