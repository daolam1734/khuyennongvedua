import React from 'react';
import { AppRoute } from '../types';
import { Home, MessageSquare, Camera, BookOpen, CalendarCheck } from 'lucide-react';

interface NavigationProps {
  currentRoute: AppRoute;
  setRoute: (route: AppRoute) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentRoute, setRoute }) => {
  const navItems = [
    { route: AppRoute.HOME, label: 'Trang chủ', icon: Home },
    { route: AppRoute.SCHEDULE, label: 'Lịch vụ', icon: CalendarCheck },
    { route: AppRoute.CHAT, label: 'Tư vấn', icon: MessageSquare },
    { route: AppRoute.DIAGNOSIS, label: 'Chẩn đoán', icon: Camera },
    { route: AppRoute.LIBRARY, label: 'Kiến thức', icon: BookOpen },
  ];

  return (
    <>
      {/* Desktop Sidebar (Left) - Visible on lg+ */}
      <div className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-emerald-800 text-white shadow-xl z-50">
        <div className="p-6 border-b border-emerald-700">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <span className="text-3xl">🌴</span> Dừa Việt
          </h1>
          <p className="text-xs text-emerald-300 mt-1">Trợ lý khuyến nông 4.0</p>
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.route}
              onClick={() => setRoute(item.route)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentRoute === item.route
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-emerald-100 hover:bg-emerald-700'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-emerald-700 text-xs text-center text-emerald-300">
          Phiên bản Beta 1.0
        </div>
      </div>

      {/* Mobile Bottom Navigation - Visible on lg- */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 px-1 pb-safe shadow-lg z-50">
        {navItems.map((item) => (
          <button
            key={item.route}
            onClick={() => setRoute(item.route)}
            className={`flex flex-col items-center p-2 rounded-lg min-w-[60px] transition-colors ${
              currentRoute === item.route
                ? 'text-emerald-600 bg-emerald-50'
                : 'text-gray-400 hover:text-emerald-500'
            }`}
          >
            <item.icon size={22} strokeWidth={currentRoute === item.route ? 2.5 : 2} />
            <span className="text-[10px] font-medium mt-1 truncate max-w-[64px]">{item.label}</span>
          </button>
        ))}
      </div>
    </>
  );
};

export default Navigation;
