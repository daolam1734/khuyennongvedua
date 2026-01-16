import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import ChatPage from './pages/ChatPage';
import DiagnosisPage from './pages/DiagnosisPage';
import LibraryPage from './pages/LibraryPage';
import SchedulePage from './pages/SchedulePage';
import ForumPage from './pages/ForumPage';
import { AppRoute, RegionInfo, WeatherData } from './types';
import { REGIONS } from './constants';
import { fetchWeatherData } from './services/weatherService';

const App: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.HOME);
  const [initialChatPrompt, setInitialChatPrompt] = useState<string | undefined>(undefined);
  const [selectedRegion, setSelectedRegion] = useState<RegionInfo>(REGIONS[0]); // Default to DBSCL
  
  // Weather State
  const [weatherData, setWeatherData] = useState<WeatherData>({
    temp: 0, humidity: 0, precipitation: 0, weatherCode: 0, 
    description: '', isDay: true, loading: true
  });

  useEffect(() => {
    const initWeather = async () => {
      const data = await fetchWeatherData();
      setWeatherData(data);
    };
    initWeather();
  }, []);

  const navigateToChatWithPrompt = (prompt: string) => {
    setInitialChatPrompt(prompt);
    setCurrentRoute(AppRoute.CHAT);
  };

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.HOME:
        return (
          <Home 
            setRoute={setCurrentRoute} 
            onAskCategory={navigateToChatWithPrompt} 
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            weatherData={weatherData}
          />
        );
      case AppRoute.SCHEDULE:
        return (
          <SchedulePage 
            selectedRegion={selectedRegion} 
            onAskAdvice={navigateToChatWithPrompt}
            weatherData={weatherData}
          />
        );
      case AppRoute.CHAT:
        return (
          <ChatPage 
            initialPrompt={initialChatPrompt} 
            clearInitialPrompt={() => setInitialChatPrompt(undefined)} 
            selectedRegion={selectedRegion}
            weatherData={weatherData}
          />
        );
      case AppRoute.DIAGNOSIS:
        return <DiagnosisPage selectedRegion={selectedRegion} />;
      case AppRoute.LIBRARY:
        return <LibraryPage onAskCategory={navigateToChatWithPrompt} />;
      case AppRoute.FORUM:
        return <ForumPage onAskAdvice={navigateToChatWithPrompt} />;
      default:
        return (
          <Home 
            setRoute={setCurrentRoute} 
            onAskCategory={navigateToChatWithPrompt}
            selectedRegion={selectedRegion}
            setSelectedRegion={setSelectedRegion}
            weatherData={weatherData}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <Navigation currentRoute={currentRoute} setRoute={setCurrentRoute} />
      
      <main className="lg:ml-64 min-h-screen transition-all duration-300">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;