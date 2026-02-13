
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import CampaignGenerator from './components/CampaignGenerator';
import PitchGenerator from './components/PitchGenerator';
import LeadScorer from './components/LeadScorer';
import LoginPage from './components/LoginPage';
import PlatformPage from './components/PlatformPage';
import MarketInsights from './components/MarketInsights';
import AdminPage from './components/AdminPage';
import { AppView, User } from './types';

function App() {
  const [currentView, setCurrentView] = useState<AppView>(AppView.DASHBOARD);
  const [user, setUser] = useState<User | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('mm_user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('mm_user');
      }
    }
    setIsInitialized(true);
  }, []);

  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('mm_user', JSON.stringify(userData));
    setCurrentView(AppView.DASHBOARD);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('mm_user');
    setCurrentView(AppView.LOGIN);
  };

  if (!isInitialized) return null;

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderView = () => {
    switch (currentView) {
      case AppView.DASHBOARD:
        return <Dashboard onNavigate={setCurrentView} isAdmin={user.role === 'Chief Strategist' || user.username === 'admin'} />;
      case AppView.CAMPAIGN:
        return <CampaignGenerator />;
      case AppView.PITCH:
        return <PitchGenerator />;
      case AppView.LEAD_SCORE:
        return <LeadScorer />;
      case AppView.PLATFORM:
        return <PlatformPage />;
      case AppView.MARKET_INSIGHTS:
        return <MarketInsights />;
      case AppView.ADMIN:
        return <AdminPage currentUser={user} onUpdateCurrentUser={setUser} />;
      default:
        return <Dashboard onNavigate={setCurrentView} isAdmin={user.role === 'Chief Strategist' || user.username === 'admin'} />;
    }
  };

  return (
    <Layout currentView={currentView} setView={setCurrentView} user={user} onLogout={handleLogout}>
      {renderView()}
    </Layout>
  );
}

export default App;
