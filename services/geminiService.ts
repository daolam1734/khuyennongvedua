import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION, PEST_DATABASE } from '../constants';
import { WeatherData } from "../types";

const apiKey = process.env.API_KEY;

// Initialize client
const ai = new GoogleGenAI({ apiKey: apiKey });

const getRegionalInstruction = (regionName: string, weather?: WeatherData) => {
  let weatherContext = "";
  if (weather && !weather.error) {
    weatherContext = `
    THÔNG TIN THỜI TIẾT THỰC TẾ TẠI CHỖ NGƯỜI DÙNG:
    - Nhiệt độ: ${weather.temp}°C
    - Độ ẩm: ${weather.humidity}%
    - Tình trạng: ${weather.description}
    - Lượng mưa: ${weather.precipitation}mm
    
    HÃY SỬ DỤNG THÔNG TIN NÀY ĐỂ TƯ VẤN CỤ THỂ HƠN (Ví dụ: nếu đang mưa thì khuyên không bón phân, nếu nắng nóng thì khuyên tưới nước).
    `;
  }

  return `${SYSTEM_INSTRUCTION}
  
  THÔNG TIN QUAN TRỌNG:
  Người dùng đang canh tác tại vùng: "${regionName}".
  Hãy điều chỉnh lời khuyên của bạn cho phù hợp với điều kiện thổ nhưỡng, khí hậu và dịch hại đặc thù của vùng này.
  Ví dụ: 
  - ĐBSCL: Chú ý phèn, mặn, mương liếp.
  - Miền Trung: Chú ý giữ ẩm đất cát, gió bão, sâu bệnh mùa nắng nóng.
  - Phía Bắc: Chú ý chống rét.

  ${weatherContext}
  `;
};

export const generateTextResponse = async (
  prompt: string,
  history: { role: string; parts: { text: string }[] }[] = [],
  regionName: string = "Đồng bằng sông Cửu Long",
  weatherData?: WeatherData
): Promise<string> => {
  try {
    const model = 'gemini-3-flash-preview'; // Fast and smart for chat
    
    const contents = [
      ...history.map(h => ({ role: h.role, parts: h.parts })),
      { role: 'user', parts: [{ text: prompt }] }
    ];

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: model,
      contents: contents,
      config: {
        systemInstruction: getRegionalInstruction(regionName, weatherData),
        temperature: 0.7, // Creative but grounded
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
  promptText: string = "Hãy nhận diện sâu bệnh và tư vấn cách phòng trừ cho cây dừa này.",
  regionName: string = "Đồng bằng sông Cửu Long"
): Promise<string> => {
  try {
    // Sử dụng Gemini 3 Pro cho khả năng suy luận hình ảnh phức tạp và chính xác cao hơn
    const model = 'gemini-3-pro-preview'; 

    const imagePart = {
      inlineData: {
        mimeType: 'image/jpeg',
        data: base64Image
      }
    };
    
    // Xây dựng Context chuyên sâu
    const pestContext = PEST_DATABASE.map(p => `- ${p.name} (${p.scientificName})`).join('\n');
    
    const expertSystemPrompt = `
    Bạn là một Chuyên gia Bệnh học Thực vật (Plant Pathologist) cao cấp từ Viện Nghiên cứu Dầu & Cây có dầu (IOOP) Việt Nam.
    Nhiệm vụ của bạn là phân tích hình ảnh cây dừa được cung cấp để chẩn đoán chính xác tình trạng sức khỏe.

    DANH SÁCH CÁC BỆNH/SÂU HẠI PHỔ BIẾN CẦN LƯU Ý (Tham chiếu):
    ${pestContext}

    BỐI CẢNH CANH TÁC:
    - Vùng trồng: ${regionName}
    
    YÊU CẦU PHÂN TÍCH (QUAN TRỌNG):
    1. Quan sát kỹ lưỡng các dấu hiệu trên lá (đốm, cháy, cắn phá), thân (lỗ đục, nhựa), hoặc quả.
    2. Nếu hình ảnh không rõ ràng hoặc không phải cây dừa, hãy báo cáo trung thực.
    3. Ưu tiên các biện pháp sinh học (IPM) trước khi đề xuất thuốc hóa học.
    
    HÃY TRẢ LỜI THEO CẤU TRÚC MARKDOWN SAU:
    
    ### 1. Kết quả Chẩn đoán
    *   **Tên bệnh/Sâu hại:** [Tên Tiếng Việt] - *[Tên Khoa học]*
    *   **Độ tin cậy:** [Cao/Trung bình/Thấp]
    *   **Mức độ nghiêm trọng:** [Khẩn cấp/Cần theo dõi/Nhẹ]

    ### 2. Dấu hiệu nhận biết qua ảnh
    *   [Mô tả chi tiết các triệu chứng nhìn thấy được trên ảnh, ví dụ: vết cắn hình chữ V, đốm vàng quầng nâu...]

    ### 3. Nguyên nhân & Cơ chế
    *   Do [Nấm/Vi khuẩn/Côn trùng/Dinh dưỡng].
    *   Điều kiện phát sinh: [Liên hệ với khí hậu vùng ${regionName}].

    ### 4. Phác đồ điều trị (Chuẩn Khuyến Nông)
    *   **Biện pháp canh tác/Sinh học (Ưu tiên):** [Liệt kê cụ thể, ví dụ: nấm xanh, ong ký sinh, vệ sinh...]
    *   **Biện pháp hóa học (Khi cần thiết):** [Nêu tên hoạt chất thuốc BVTV được phép sử dụng, KHÔNG nêu tên thương mại cụ thể trừ khi rất phổ biến].

    ### 5. Khuyến nghị phòng ngừa
    *   [Lời khuyên ngắn gọn để tránh tái phát]
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
        temperature: 0.4, // Giảm temperature để tăng tính chính xác, thực tế
      }
    });

    return response.text || "Không thể phân tích ảnh này. Vui lòng chụp lại rõ nét hơn.";
  } catch (error) {
    console.error("Gemini Vision Error:", error);
    return "Hệ thống đang quá tải hoặc gặp lỗi kết nối. Vui lòng thử lại sau giây lát.";
  }
};
