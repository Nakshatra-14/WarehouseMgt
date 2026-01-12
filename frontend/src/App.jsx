import React, { useEffect, useState } from 'react';
import Topbar from './components/Topbar.jsx';
import LandingPage from './pages/LandingPage.jsx';
import Dashboard from './pages/Dashboard.jsx';
import DamageDetection from './pages/DamageDetection.jsx';
import Invoicing from './pages/Invoicing.jsx';
import Analytics from './pages/Analytics.jsx';
import { seedWarehouseData } from './utils/seed.js';
import './App.css';

export default function App() {
  const [activePage, setActivePage] = useState('landing');
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    seedWarehouseData();
  }, []);

  const titleMap = {
    dashboard: 'Overview Dashboard',
    damage: 'AI Damage Detection',
    invoice: 'Smart Invoicing',
    analytics: 'Predictive Analytics',
  };

  const handlePageChange = (page) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActivePage(page);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const handleGetStarted = () => {
    handlePageChange('dashboard');
  };

  // Show landing page without topbar
  if (activePage === 'landing') {
    return (
      <div className="min-h-screen bg-black text-white">
        <LandingPage onGetStarted={handleGetStarted} />
      </div>
    );
  }

  // Update handlePageChange to work with landing page
  const handlePageChangeWithLanding = (page) => {
    if (page === 'landing') {
      setActivePage('landing');
    } else {
      handlePageChange(page);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main */}
      <main className="relative overflow-hidden">
        <Topbar activePage={activePage} setActivePage={handlePageChangeWithLanding} />
        <div className={`page-container ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          {activePage === 'dashboard' && <Dashboard />}
          {activePage === 'damage' && <DamageDetection />}
          {activePage === 'invoice' && <Invoicing />}
          {activePage === 'analytics' && <Analytics />}
        </div>
      </main>
    </div>
  );
}
