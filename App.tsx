import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import MainApp from './components/MainApp';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'landing' | 'app'>('landing');

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPage onStart={() => setCurrentView('app')} />
      ) : (
        <MainApp onBack={() => setCurrentView('landing')} />
      )}
    </>
  );
};

export default App;