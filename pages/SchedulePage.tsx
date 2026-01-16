import React, { useState, useEffect } from 'react';
import { RegionInfo, CareTask, TreeStage, WeatherData } from '../types';
import { TREE_STAGES } from '../constants';
import { Calendar, Droplets, Shovel, Bug, Sun, CloudRain, ArrowRight, MessageSquare, CloudLightning, Thermometer } from 'lucide-react';

interface SchedulePageProps {
  selectedRegion: RegionInfo;
  onAskAdvice: (prompt: string) => void;
  weatherData: WeatherData;
}

const SchedulePage: React.FC<SchedulePageProps> = ({ selectedRegion, onAskAdvice, weatherData }) => {
  const [selectedStage, setSelectedStage] = useState<TreeStage>(TREE_STAGES[2]); // Default to Business
  const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth() + 1);
  const [tasks, setTasks] = useState<CareTask[]>([]);
  const [weatherTasks, setWeatherTasks] = useState<CareTask[]>([]);

  // 1. Generate Standard Monthly Tasks
  useEffect(() => {
    const isRainySeason = currentMonth >= 5 && currentMonth <= 11;
    const generatedTasks: CareTask[] = [];

    if (!isRainySeason) {
        generatedTasks.push({
            type: 'water',
            title: 'Tưới nước giữ ẩm',
            description: 'Tưới 2-3 ngày/lần. Tủ gốc bằng rơm rạ để tránh bốc hơi.'
        });
    } else {
        generatedTasks.push({
            type: 'care',
            title: 'Thoát nước',
            description: 'Khơi thông mương rãnh, tránh ngập úng rễ.'
        });
    }

    if (selectedStage.id === 'new') {
        generatedTasks.push({
            type: 'care',
            title: 'Che mát cây con',
            description: 'Che chắn tránh nắng gắt làm cháy lá non.'
        });
        generatedTasks.push({
            type: 'fertilize',
            title: 'Bón phân hữu cơ lỏng',
            description: 'Tưới phân loãng 1 tháng/lần để kích thích rễ.'
        });
    } else if (selectedStage.id === 'young') {
        if ([2, 5, 8, 11].includes(currentMonth)) {
             generatedTasks.push({
                type: 'fertilize',
                title: 'Bón phân NPK 20-20-15',
                description: 'Bón 200-300g/cây. Xới nhẹ xung quanh gốc trước khi bón.'
            });
        }
        generatedTasks.push({
            type: 'pest',
            title: 'Phòng Bọ cánh cứng',
            description: 'Kiểm tra đọt non thường xuyên, đặt bẫy Pheromone.'
        });
    } else if (selectedStage.id === 'business') {
        if ([1, 4, 7, 10].includes(currentMonth)) {
             generatedTasks.push({
                type: 'fertilize',
                title: 'Bón phân nuôi trái',
                description: 'Bón NPK 13-13-13+TE và Kali Clorua. Bón muối ăn nếu xa biển.'
            });
        }
        generatedTasks.push({
            type: 'care',
            title: 'Vệ sinh cổ hấu (Rửa nhen)',
            description: 'Cắt bỏ mo nang khô, dọn sạch nách lá để ngừa kiến vương.'
        });
         generatedTasks.push({
            type: 'pest',
            title: 'Phòng Sâu đầu đen/Đuông',
            description: 'Theo dõi tàu lá già. Nếu có lỗ đục cần xử lý ngay.'
        });
    }

    setTasks(generatedTasks);
  }, [currentMonth, selectedStage]);

  // 2. Generate Real-time Weather Tasks
  useEffect(() => {
      if (weatherData.loading || weatherData.error) return;

      const rtTasks: CareTask[] = [];

      // Rain Logic
      if (weatherData.precipitation > 5) {
          rtTasks.push({
              type: 'care',
              title: '⚠️ Mưa lớn hôm nay',
              description: `Lượng mưa ${weatherData.precipitation}mm. Cần kiểm tra ngay mương thoát nước, ngưng bón phân.`
          });
      } else if (weatherData.precipitation > 0) {
          rtTasks.push({
              type: 'care',
              title: '🌧️ Đang có mưa',
              description: 'Tận dụng nước mưa, không cần tưới thêm hôm nay.'
          });
      }

      // Temp Logic
      if (weatherData.temp > 35) {
          rtTasks.push({
              type: 'water',
              title: '☀️ Nắng nóng gay gắt',
              description: `Nhiệt độ ${weatherData.temp}°C. Cần tưới bù nước vào chiều mát và tủ gốc dày hơn.`
          });
      }

      setWeatherTasks(rtTasks);

  }, [weatherData]);

  const getTaskIcon = (type: string) => {
      switch(type) {
          case 'water': return <Droplets className="text-blue-500" />;
          case 'fertilize': return <Shovel className="text-emerald-600" />;
          case 'pest': return <Bug className="text-red-500" />;
          default: return <Sun className="text-orange-500" />;
      }
  };

  const getTaskColor = (type: string) => {
      switch(type) {
          case 'water': return 'bg-blue-50 border-blue-100';
          case 'fertilize': return 'bg-emerald-50 border-emerald-100';
          case 'pest': return 'bg-red-50 border-red-100';
          default: return 'bg-orange-50 border-orange-100';
      }
  };

  return (
    <div className="p-4 md:p-8 pb-24 lg:pb-8 max-w-4xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
            <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
                <Calendar className="text-emerald-600" /> Lịch Nông Vụ
            </h2>
            <p className="text-sm text-gray-500">Kế hoạch chăm sóc cho vùng <b>{selectedRegion.name}</b></p>
        </div>
        
        <div className="bg-white p-1 rounded-lg border border-gray-200 shadow-sm flex items-center">
            <span className="text-sm text-gray-500 px-2">Tuổi cây:</span>
            <select 
                value={selectedStage.id}
                onChange={(e) => {
                    const stage = TREE_STAGES.find(s => s.id === e.target.value);
                    if (stage) setSelectedStage(stage);
                }}
                className="bg-transparent border-none text-emerald-700 font-semibold focus:ring-0 text-sm cursor-pointer py-1"
            >
                {TREE_STAGES.map(stage => (
                    <option key={stage.id} value={stage.id}>{stage.name}</option>
                ))}
            </select>
        </div>
      </div>

      {/* Real-time Weather Adjustment Section */}
      {!weatherData.loading && !weatherData.error && weatherTasks.length > 0 && (
          <div className="mb-8 animate-fade-in">
             <h3 className="font-bold text-gray-800 text-lg mb-3 flex items-center gap-2">
                 <CloudLightning className="text-blue-500" /> Điều chỉnh theo thời tiết thực tế
             </h3>
             <div className="grid gap-3">
                 {weatherTasks.map((task, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-blue-50 to-white p-4 rounded-xl border border-blue-200 shadow-sm flex items-start gap-3">
                        <div className="bg-white p-2 rounded-lg shadow-sm">
                            {weatherData.temp > 34 ? <Sun className="text-orange-500 animate-pulse" /> : <CloudRain className="text-blue-500 animate-bounce" />}
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900">{task.title}</h4>
                            <p className="text-sm text-gray-700">{task.description}</p>
                        </div>
                    </div>
                 ))}
             </div>
          </div>
      )}

      {/* Month Selector / Display */}
      <div className="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-2xl p-6 text-white shadow-lg mb-6 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
             <div>
                <div className="flex items-center gap-3 mb-1">
                    <span className="text-4xl font-bold">Tháng {currentMonth}</span>
                    <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-medium backdrop-blur-sm border border-white/30">
                        {currentMonth >= 5 && currentMonth <= 11 ? 'Mùa Mưa' : 'Mùa Khô'}
                    </span>
                </div>
                <p className="text-emerald-100 opacity-90 max-w-lg">
                    {selectedStage.id === 'business' 
                        ? 'Giai đoạn nuôi trái quan trọng. Cần chú ý cân bằng nước và dinh dưỡng.' 
                        : 'Giai đoạn sinh trưởng. Ưu tiên phát triển bộ rễ và lá xanh tốt.'}
                </p>
             </div>
             
             <div className="flex items-center bg-white/10 rounded-lg p-1">
                 <button 
                    onClick={() => setCurrentMonth(prev => prev === 1 ? 12 : prev - 1)}
                    className="p-2 hover:bg-white/20 rounded-md transition-colors"
                 >
                     ←
                 </button>
                 <span className="mx-4 font-bold min-w-[80px] text-center">Tháng {currentMonth}</span>
                 <button 
                    onClick={() => setCurrentMonth(prev => prev === 12 ? 1 : prev + 1)}
                    className="p-2 hover:bg-white/20 rounded-md transition-colors"
                 >
                     →
                 </button>
             </div>
          </div>
          <div className="absolute right-[-20px] top-[-30px] opacity-10 pointer-events-none">
              {currentMonth >= 5 && currentMonth <= 11 ? <CloudRain size={180} /> : <Sun size={180} />}
          </div>
      </div>

      {/* Tasks List */}
      <div className="space-y-4 animate-fade-in">
          <h3 className="font-bold text-gray-800 text-lg">Việc định kỳ tháng {currentMonth}</h3>
          
          {tasks.map((task, index) => (
              <div 
                key={index}
                className={`p-4 rounded-xl border flex gap-4 items-start ${getTaskColor(task.type)}`}
              >
                  <div className="bg-white p-2 rounded-lg shadow-sm">
                      {getTaskIcon(task.type)}
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-800 text-base">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                  </div>
              </div>
          ))}

          {tasks.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                  Tháng này chủ yếu theo dõi vườn, không có tác vụ định kỳ đặc biệt.
              </div>
          )}
      </div>

      {/* AI Prompt */}
      <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100 flex flex-col md:flex-row items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full text-blue-600">
                  <MessageSquare size={24} />
              </div>
              <div className="flex-1 text-center md:text-left">
                  <h4 className="font-bold text-blue-900">Cần lịch chi tiết hơn?</h4>
                  <p className="text-sm text-blue-700">
                      Yêu cầu Kỹ sư Dừa Việt lập bảng kế hoạch chi tiết theo ngày cho vườn {selectedStage.name.toLowerCase()} của bạn.
                  </p>
              </div>
              <button 
                  onClick={() => onAskAdvice(`Lập lịch chăm sóc chi tiết cho dừa ${selectedStage.name} vào tháng ${currentMonth} tại vùng ${selectedRegion.name}, với điều kiện thời tiết hiện tại: ${weatherData.description}, ${weatherData.temp} độ C.`)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium shadow-sm flex items-center gap-2 transition-colors whitespace-nowrap"
              >
                  Lập kế hoạch <ArrowRight size={16} />
              </button>
          </div>
      </div>
    </div>
  );
};

export default SchedulePage;
