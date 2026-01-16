import { WeatherData } from '../types';

// Ben Tre coordinates (Heart of Coconut land) as default
const DEFAULT_LAT = 10.24;
const DEFAULT_LON = 106.37;

export const getWMODescription = (code: number): string => {
  switch (code) {
    case 0: return "Trời quang đãng";
    case 1: return "Có mây rải rác";
    case 2: return "Nhiều mây";
    case 3: return "Âm u";
    case 45: case 48: return "Có sương mù";
    case 51: case 53: case 55: return "Mưa phùn nhẹ";
    case 61: return "Mưa nhỏ";
    case 63: return "Mưa vừa";
    case 65: return "Mưa to";
    case 80: case 81: case 82: return "Mưa rào";
    case 95: return "Dông lốc";
    case 96: case 99: return "Dông kèm mưa đá";
    default: return "Thời tiết thất thường";
  }
};

export const fetchWeatherData = async (): Promise<WeatherData> => {
  try {
    // 1. Get Location
    const position = await new Promise<GeolocationPosition>((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error("Geolocation not supported"));
      } else {
        navigator.geolocation.getCurrentPosition(resolve, reject, { timeout: 5000 });
      }
    }).catch(() => null);

    const lat = position ? position.coords.latitude : DEFAULT_LAT;
    const lon = position ? position.coords.longitude : DEFAULT_LON;

    // 2. Fetch from Open-Meteo (Free, no API key required)
    const response = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,weather_code,is_day&timezone=auto`
    );

    if (!response.ok) throw new Error("Weather API failed");

    const data = await response.json();
    const current = data.current;

    return {
      temp: current.temperature_2m,
      humidity: current.relative_humidity_2m,
      precipitation: current.precipitation,
      weatherCode: current.weather_code,
      description: getWMODescription(current.weather_code),
      isDay: current.is_day === 1,
      loading: false
    };

  } catch (error) {
    console.error("Weather fetch error", error);
    return {
      temp: 30, // Fallback
      humidity: 80,
      precipitation: 0,
      weatherCode: 1,
      description: "Không có dữ liệu thời tiết",
      isDay: true,
      loading: false,
      error: "Không thể lấy dữ liệu thời tiết"
    };
  }
};

export const getWeatherAdvice = (weather: WeatherData): string => {
  if (weather.precipitation > 2) {
    return "Đang có mưa. Tạm ngưng tưới nước và kiểm tra thoát nước vườn dừa.";
  }
  if (weather.temp > 34) {
    return "Trời nắng gắt. Nên tưới bù nước và tủ gốc giữ ẩm.";
  }
  if (weather.humidity > 90) {
    return "Độ ẩm cao. Cảnh báo nấm bệnh phát triển (thối đọt, rụng trái).";
  }
  return "Thời tiết thuận lợi cho dừa phát triển.";
};
