import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION, PEST_DATABASE } from '../constants';
import { WeatherData } from "../types";

const apiKey = process.env.API_KEY;

// Initialize client
const ai = new GoogleGenAI({ apiKey: apiKey });

// Tối ưu hóa prompt hệ thống để ngắn gọn hơn, giảm thời gian xử lý token đầu vào
const getRegionalInstruction = (regionName: string, weather?: WeatherData) => {
  let weatherContext = "";
  if (weather && !weather.error) {
    weatherContext = `THỜI TIẾT HIỆN TẠI: Nhiệt độ ${weather.temp}°C, ${weather.description}. Lượng mưa: ${weather.precipitation}mm. => Hãy điều chỉnh lời khuyên bón phân/tưới nước dựa trên thời tiết này.`;
  }

  return `${SYSTEM_INSTRUCTION}
  
  THÔNG TIN NGỮ CẢNH (CONTEXT):
  - Vùng canh tác: "${regionName}" (Lưu ý đặc thù thổ nhưỡng vùng này).
  - ${weatherContext}
  `;
};

export const generateTextResponse = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  regionName: string = "Đồng bằng sông Cửu Long",
  weatherData?: WeatherData
): Promise<string> => {
  try {
    // Sử dụng model Flash cho tốc độ phản hồi nhanh, cân bằng với chất lượng
    const model = 'gemini-3-flash-preview'; 
    
    const contents = [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: prompt }] }
    ];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: getRegionalInstruction(regionName, weatherData),
        temperature: 0.5, // Giảm temperature để câu trả lời tập trung và chính xác hơn
        maxOutputTokens: 4000, // Tăng giới hạn để đảm bảo câu trả lời không bị cắt giữa chừng
      }
    });

    return response.text || "Xin lỗi, tôi không thể trả lời lúc này. Vui lòng thử lại.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Đã xảy ra lỗi khi kết nối với chuyên gia. Vui lòng kiểm tra mạng hoặc thử lại sau.";
  }
};

export const analyzeImage = async (
  base64Image: string, 
  promptText: string = "Nhận diện sâu bệnh và tư vấn cách phòng trừ.",
  regionName: string = "Đồng bằng sông Cửu Long"
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview'; 

    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image
      }
    };
    
    const pestNames = PEST_DATABASE.map(p => p.name).join(', ');
    
    const expertSystemPrompt = `
    Bạn là Kỹ sư Dừa Việt (Kỹ sư Tâm). Phân tích ảnh cây dừa tại vùng ${regionName}.
    Tham chiếu danh sách sâu bệnh phổ biến: ${pestNames}.

    NHIỆM VỤ:
    1. Quan sát kỹ các dấu hiệu trên lá, thân, quả.
    2. Chẩn đoán chính xác tên bệnh/sâu hại.
    3. Đưa ra phác đồ điều trị chi tiết (ưu tiên sinh học).

    YÊU CẦU TRẢ LỜI (Markdown):
    ### 1. Chẩn đoán & Mức độ
    * Tên bệnh: ...
    * Mức độ hại: ...

    ### 2. Dấu hiệu nhận biết qua ảnh
    * ...

    ### 3. Giải pháp điều trị (Quan trọng)
    * **Biện pháp sinh học/Canh tác:** ...
    * **Biện pháp hóa học (nếu cần kíp):** (Chỉ nêu tên hoạt chất, nhắc bà con nguyên tắc 4 đúng).

    ### 4. Lời khuyên phòng ngừa
    * ...
    `;

    const textPart = {
      text: promptText
    };

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: {
        parts: [imagePart, textPart]
      },
      config: {
        systemInstruction: expertSystemPrompt,
        temperature: 0.4,
        maxOutputTokens: 4000, // Tăng giới hạn token cho phân tích ảnh chi tiết
      }
    });

    return response.text || "Không thể phân tích ảnh này. Vui lòng chụp lại rõ nét hơn.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Hệ thống đang quá tải hoặc gặp lỗi kết nối. Vui lòng thử lại sau giây lát.";
  }
};