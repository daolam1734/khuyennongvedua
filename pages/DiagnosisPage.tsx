import React, { useState, useRef } from 'react';
import { Camera, Upload, X, AlertCircle, CheckCircle2, MapPin, ScanLine, Activity } from 'lucide-react';
import { analyzeImage } from '../services/geminiService';
import ReactMarkdown from 'react-markdown';
import { RegionInfo } from '../types';

interface DiagnosisPageProps {
  selectedRegion: RegionInfo;
}

const DiagnosisPage: React.FC<DiagnosisPageProps> = ({ selectedRegion }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Ảnh quá lớn. Vui lòng chọn ảnh dưới 5MB.");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setSelectedImage(base64String);
        setResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    setResult(null);

    try {
       // Extract pure base64
       const base64Data = selectedImage.split(',')[1];
       // Pass selected region to the analysis service
       const analysis = await analyzeImage(base64Data, undefined, selectedRegion.name);
       setResult(analysis);
    } catch (error) {
       setResult("Không thể phân tích. Vui lòng thử lại.");
    } finally {
       setIsAnalyzing(false);
    }
  };

  const resetImage = () => {
    setSelectedImage(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-4 md:p-8 pb-24 lg:pb-8 max-w-4xl mx-auto h-[calc(100vh-64px)] lg:h-screen overflow-y-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
        <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
          <Activity className="text-emerald-600" /> AI Chẩn đoán Sâu bệnh
        </h2>
        <div className="inline-flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-sm border border-emerald-100">
           <MapPin size={14} className="mr-1" /> Dữ liệu vùng: {selectedRegion.name}
        </div>
      </div>

      {!selectedImage ? (
        <div className="bg-white rounded-2xl border-2 border-dashed border-emerald-200 p-8 flex flex-col items-center justify-center text-center space-y-4 hover:bg-emerald-50 transition-colors cursor-pointer min-h-[300px]"
             onClick={() => fileInputRef.current?.click()}>
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-2 animate-pulse">
            <Upload className="w-10 h-10 text-emerald-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Tải ảnh lên hoặc chụp ảnh</h3>
          <p className="text-sm text-gray-500 max-w-xs">
            Chụp rõ phần lá, thân hoặc quả bị bệnh. Hệ thống sử dụng <b>Gemini 1.5 Pro</b> để phân tích chi tiết.
          </p>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
          <button className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:bg-emerald-700 transition-colors">
            Chọn ảnh từ thư viện
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-gray-200 bg-black group">
            <img src={selectedImage} alt="Selected" className="w-full max-h-[400px] object-contain mx-auto" />
            
            {/* Scanning Animation Overlay */}
            {isAnalyzing && (
                <div className="absolute inset-0 pointer-events-none">
                    <div className="w-full h-1 bg-emerald-400/80 shadow-[0_0_15px_rgba(52,211,153,0.8)] absolute top-0 animate-[scan_2s_ease-in-out_infinite]"></div>
                    <div className="absolute inset-0 bg-emerald-500/10 animate-pulse"></div>
                    <div className="absolute bottom-4 left-0 right-0 text-center text-white font-mono text-sm tracking-widest">
                        AI PROCESSING...
                    </div>
                </div>
            )}
            
            {!isAnalyzing && (
                <button 
                  onClick={resetImage}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                >
                  <X size={20} />
                </button>
            )}
            
            <style>{`
                @keyframes scan {
                    0% { top: 0%; opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 1; }
                    100% { top: 100%; opacity: 0; }
                }
            `}</style>
          </div>

          {!result && (
             <button 
               onClick={handleAnalyze}
               disabled={isAnalyzing}
               className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg flex items-center justify-center gap-3 transition-all transform active:scale-95 ${
                 isAnalyzing 
                 ? 'bg-gray-800 text-gray-300 cursor-not-allowed' 
                 : 'bg-emerald-600 hover:bg-emerald-700 text-white'
               }`}
             >
               {isAnalyzing ? (
                 <><ScanLine className="animate-spin-slow" /> Đang phân tích mẫu bệnh...</>
               ) : (
                 <><ScanLine size={24} /> Bắt đầu chẩn đoán</>
               )}
             </button>
          )}

          {result && (
            <div className="bg-white rounded-2xl shadow-xl border border-emerald-100 overflow-hidden animate-fade-in">
              <div className="bg-emerald-600 p-4 text-white flex items-center gap-3">
                <CheckCircle2 className="w-8 h-8" />
                <div>
                    <h3 className="text-lg font-bold">Kết quả chẩn đoán</h3>
                    <p className="text-emerald-100 text-xs">Phân tích bởi AI Plant Pathologist</p>
                </div>
              </div>
              
              <div className="p-6 prose prose-emerald max-w-none prose-p:text-gray-700 prose-headings:text-emerald-800 prose-li:text-gray-700">
                <ReactMarkdown>{result}</ReactMarkdown>
              </div>
              
              <div className="p-4 bg-orange-50 border-t border-orange-100 flex gap-3">
                 <AlertCircle className="text-orange-600 flex-shrink-0 mt-0.5" />
                 <div className="text-sm text-orange-800">
                   <strong>Miễn trừ trách nhiệm:</strong> Kết quả chẩn đoán của AI chỉ mang tính tham khảo dựa trên hình ảnh được cung cấp. Đối với các bệnh dịch nghiêm trọng, bà con vui lòng liên hệ trực tiếp trạm Khuyến nông hoặc Chi cục Trồng trọt & BVTV địa phương để được hỗ trợ.
                 </div>
              </div>
               
               <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-center">
                   <button 
                     onClick={resetImage}
                     className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-100 hover:text-emerald-700 transition-colors shadow-sm"
                   >
                     Chụp ảnh mẫu khác
                   </button>
               </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DiagnosisPage;
