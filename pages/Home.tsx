import React from 'react';
import { AppRoute, CoconutCategory, RegionInfo, WeatherData } from '../types';
import { CATEGORIES, REGIONS } from '../constants';
import { ArrowRight, CloudSun, TrendingUp, Camera, MapPin, Droplets, Thermometer, Wind } from 'lucide-react';
import { getWeatherAdvice } from '../services/weatherService';

interface HomeProps {
  setRoute: (route: AppRoute) => void;
  onAskCategory: (prompt: string) => void;
  selectedRegion: RegionInfo;
  setSelectedRegion: (region: RegionInfo) => void;
  weatherData: WeatherData;
}

const Home: React.FC<HomeProps> = ({ setRoute, onAskCategory, selectedRegion, setSelectedRegion, weatherData }) => {
  return (
    <div className="p-4 md:p-8 space-y-6 pb-24 lg:pb-8">
      {/* Header Banner with Weather */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-500 rounded-2xl p-6 text-white shadow-lg relative overflow-visible">
        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
            <div>
               <h2 className="text-2xl md:text-3xl font-bold">Xin chào bà con!</h2>
               <div className="flex items-center gap-2 mt-2 bg-white/10 w-fit px-3 py-1 rounded-full text-sm">
                  <MapPin size={14} className="text-emerald-200" />
                  <select 
                    value={selectedRegion.id}
                    onChange={(e) => {
                      const region = REGIONS.find(r => r.id === e.target.value);
                      if (region) setSelectedRegion(region);
                    }}
                    className="bg-transparent border-none text-white font-medium focus:ring-0 cursor-pointer [&>option]:text-gray-900 [&>option]:bg-white py-0 pl-0 pr-6"
                  >
                    {REGIONS.map(r => (
                      <option key={r.id} value={r.id}>{r.name}</option>
                    ))}
                  </select>
               </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-xl flex items-center gap-4 min-w-[200px]">
               {weatherData.loading ? (
                 <div className="text-sm">Đang tải thời tiết...</div>
               ) : (
                 <>
                   <div className="flex flex-col items-center">
                     <span className="text-3xl font-bold">{Math.round(weatherData.temp)}°</span>
                     <span className="text-xs text-emerald-100 whitespace-nowrap">{weatherData.description}</span>
                   </div>
                   <div className="h-10 w-px bg-white/20"></div>
                   <div className="space-y-1">
                      <div className="flex items-center gap-2 text-xs">
                         <Droplets size={12} className="text-blue-300" /> {weatherData.humidity}%
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                         <Wind size={12} className="text-blue-300" /> {weatherData.precipitation > 0 ? `${weatherData.precipitation}mm` : 'Không mưa'}
                      </div>
                   </div>
                 </>
               )}
            </div>
          </div>

          <div className="mt-4 p-3 bg-white/10 rounded-lg border border-white/20 max-w-lg">
             <p className="text-sm font-medium text-emerald-50">
               💡 <span className="text-white font-bold">Lời khuyên hôm nay:</span> {weatherData.loading ? "..." : getWeatherAdvice(weatherData)}
             </p>
          </div>
          
          <button 
            onClick={() => setRoute(AppRoute.CHAT)}
            className="mt-4 bg-white text-emerald-700 px-5 py-2 rounded-full font-semibold text-sm hover:bg-emerald-50 transition-colors shadow-sm flex items-center gap-2"
          >
            Hỏi chi tiết <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="absolute right-[-20px] top-[-20px] opacity-20 pointer-events-none">
            <CloudSun size={150} />
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {CATEGORIES.map((cat: CoconutCategory) => (
          <button
            key={cat.id}
            onClick={() => onAskCategory(cat.prompt)}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all text-left group flex flex-col h-full"
          >
            <div className="bg-emerald-50 w-10 h-10 rounded-lg flex items-center justify-center text-emerald-600 mb-3 group-hover:scale-110 transition-transform">
              {cat.icon}
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">{cat.title}</h3>
            <p className="text-xs text-gray-500 line-clamp-2">{cat.description}</p>
          </button>
        ))}
      </div>

      {/* Feature Highlight: Diagnosis */}
      <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-3 py-1 rounded-full text-xs font-semibold mb-3">
             <TrendingUp size={14} /> Chức năng mới
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Chẩn đoán Sâu bệnh bằng AI</h3>
          <p className="text-gray-600 text-sm mb-4">
            Chụp ảnh lá, thân hoặc quả dừa bị bệnh. Trí tuệ nhân tạo sẽ phân tích và đưa ra phác đồ điều trị phù hợp với thời tiết tại <b>{selectedRegion.name}</b>.
          </p>
          <button 
             onClick={() => setRoute(AppRoute.DIAGNOSIS)}
             className="w-full md:w-auto bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
          >
            Chụp ảnh chẩn đoán
          </button>
        </div>
        <div className="w-full md:w-1/3 aspect-video bg-gray-100 rounded-xl overflow-hidden relative">
            <img 
              src="https://picsum.photos/400/300?grayscale" 
              alt="Diagnosis Demo" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 flex items-center justify-center">
                 <div className="bg-black/50 p-3 rounded-full border-2 border-white/50">
                    <Camera className="text-white w-8 h-8" />
                 </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
