import React, { useState } from 'react';
import { CATEGORIES, PEST_DATABASE, FARMING_PROCESS_DATABASE, COCONUT_VARIETIES } from '../constants';
import { ChevronRight, Bug, AlertTriangle, ShieldCheck, Stethoscope, BookOpen, ChevronDown, Sprout, Coins, Info } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface LibraryPageProps {
    onAskCategory: (prompt: string) => void;
}

const LibraryPage: React.FC<LibraryPageProps> = ({ onAskCategory }) => {
  const [activeTab, setActiveTab] = useState<'topics' | 'varieties' | 'process' | 'pests'>('topics');
  const [expandedPest, setExpandedPest] = useState<string | null>(null);
  const [expandedProcess, setExpandedProcess] = useState<string | null>(null);
  const [expandedVariety, setExpandedVariety] = useState<string | null>(null);

  const tabs = [
    { id: 'topics', label: 'Chủ đề' },
    { id: 'varieties', label: 'Giống Dừa' },
    { id: 'process', label: 'Quy trình' },
    { id: 'pests', label: 'Sâu bệnh' },
  ];

  return (
    <div className="p-4 md:p-8 pb-24 lg:pb-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
            <BookOpen className="text-emerald-600" /> Thư viện Kiến thức
        </h2>
        <p className="text-sm text-gray-500 mt-1">
            Cơ sở dữ liệu khoa học từ Viện Nghiên cứu Dầu & Cây có dầu (IOOP).
        </p>
      </div>
      
      {/* Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto no-scrollbar pb-2">
        {tabs.map((tab) => (
            <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all border ${
                    activeTab === tab.id 
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-md' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                }`}
            >
                {tab.label}
            </button>
        ))}
      </div>

      {activeTab === 'topics' && (
        <div className="space-y-4 animate-fade-in">
          {CATEGORIES.map((cat) => (
              <div 
                  key={cat.id} 
                  onClick={() => onAskCategory(cat.prompt)}
                  className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between cursor-pointer hover:shadow-md hover:border-emerald-200 transition-all group"
              >
                  <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-100 transition-colors">
                          {cat.icon}
                      </div>
                      <div>
                          <h3 className="font-bold text-gray-800 text-lg group-hover:text-emerald-700 transition-colors">{cat.title}</h3>
                          <p className="text-sm text-gray-500">{cat.description}</p>
                      </div>
                  </div>
                  <ChevronRight className="text-gray-300 group-hover:text-emerald-500 transition-colors" />
              </div>
          ))}
          
          <div className="mt-8 bg-blue-50 rounded-xl p-6 border border-blue-100">
              <h3 className="font-bold text-blue-900 mb-3 text-lg">Tin tức thị trường</h3>
              <p className="text-blue-800 mb-2">Giá dừa khô tại Bến Tre hôm nay ổn định.</p>
              <p className="text-sm text-blue-600">Cập nhật lúc: {new Date().toLocaleDateString('vi-VN')}</p>
          </div>
        </div>
      )}

      {activeTab === 'varieties' && (
         <div className="space-y-4 animate-fade-in">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {COCONUT_VARIETIES.map((variety) => (
                     <div key={variety.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden flex flex-col">
                         <div className="h-48 overflow-hidden relative group">
                             <img 
                                src={variety.imageUrl || "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Coconuts_in_Bentre.jpg/320px-Coconuts_in_Bentre.jpg"} 
                                alt={variety.name}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                             />
                             <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
                                 {variety.group}
                             </div>
                         </div>
                         <div className="p-4 flex-1 flex flex-col">
                             <h3 className="font-bold text-emerald-900 text-lg mb-1">{variety.name}</h3>
                             <p className="text-sm text-gray-600 mb-3 line-clamp-2">{variety.description}</p>
                             
                             <div className="mt-auto pt-3 border-t border-gray-100 space-y-2">
                                 <div className="flex items-start gap-2 text-sm text-gray-700">
                                     <Sprout size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                     <span>{variety.characteristics}</span>
                                 </div>
                                 <div className="flex items-start gap-2 text-sm text-gray-700">
                                     <Coins size={16} className="text-yellow-500 mt-0.5 shrink-0" />
                                     <span>{variety.yield}</span>
                                 </div>
                                 <div className="bg-blue-50 p-2 rounded-lg text-xs text-blue-800 flex items-start gap-2 mt-2">
                                     <Info size={14} className="mt-0.5 shrink-0" />
                                     {variety.advisory}
                                 </div>
                             </div>

                             <button 
                                onClick={() => onAskCategory(`Tư vấn chi tiết về kỹ thuật trồng giống ${variety.name}.`)}
                                className="w-full mt-4 bg-emerald-50 text-emerald-700 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-100 transition-colors"
                             >
                                Hỏi kỹ thuật trồng
                             </button>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
      )}

      {activeTab === 'process' && (
         <div className="space-y-4 animate-fade-in">
            {FARMING_PROCESS_DATABASE.map((proc) => (
                <div key={proc.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div 
                        onClick={() => setExpandedProcess(expandedProcess === proc.id ? null : proc.id)}
                        className="p-5 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                    >
                         <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shadow-sm">
                            {proc.icon}
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-900 text-lg">{proc.title}</h3>
                            <p className="text-sm text-gray-500">{proc.summary}</p>
                        </div>
                        <ChevronDown 
                            className={`text-gray-400 transition-transform duration-300 ${
                                expandedProcess === proc.id ? 'rotate-180' : ''
                            }`} 
                        />
                    </div>
                    {expandedProcess === proc.id && (
                        <div className="px-5 pb-5 pt-0 border-t border-gray-100">
                            <div className="mt-4 prose prose-emerald prose-sm max-w-none text-gray-700 bg-gray-50 p-4 rounded-lg">
                                <ReactMarkdown>{proc.content}</ReactMarkdown>
                            </div>
                            <button 
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onAskCategory(`Tôi cần tư vấn thêm chi tiết về ${proc.title}.`);
                                }}
                                className="mt-3 text-sm text-emerald-600 font-medium hover:underline flex items-center gap-1"
                            >
                                <BookOpen size={14} /> Hỏi thêm Kỹ sư về vấn đề này
                            </button>
                        </div>
                    )}
                </div>
            ))}
         </div>
      )}

      {activeTab === 'pests' && (
        <div className="space-y-4 animate-fade-in">
          {PEST_DATABASE.map((pest) => (
            <div 
              key={pest.id} 
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
            >
              <div 
                className="p-4 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => setExpandedPest(expandedPest === pest.id ? null : pest.id)}
              >
                {pest.imageUrl ? (
                   <img src={pest.imageUrl} alt={pest.name} className="w-16 h-16 rounded-lg object-cover bg-gray-100" />
                ) : (
                   <div className="w-16 h-16 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                     <Bug size={32} />
                   </div>
                )}
                <div className="flex-1">
                   <h3 className="font-bold text-gray-900 text-lg">{pest.name}</h3>
                   <p className="text-sm text-gray-500 italic">{pest.scientificName}</p>
                </div>
                <ChevronRight 
                  className={`text-gray-400 transition-transform duration-300 ${
                    expandedPest === pest.id ? 'rotate-90' : ''
                  }`} 
                />
              </div>
              
              {expandedPest === pest.id && (
                <div className="p-4 pt-0 border-t border-gray-100 bg-gray-50/50">
                   <div className="grid gap-4 mt-4">
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-bold text-red-600 flex items-center gap-2 mb-1">
                           <AlertTriangle size={16} /> Triệu chứng
                        </h4>
                        <p className="text-sm text-gray-700">{pest.symptoms}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-bold text-emerald-600 flex items-center gap-2 mb-1">
                           <ShieldCheck size={16} /> Phòng ngừa
                        </h4>
                        <p className="text-sm text-gray-700">{pest.prevention}</p>
                      </div>
                      
                      <div className="bg-white p-3 rounded-lg border border-gray-100">
                        <h4 className="text-sm font-bold text-blue-600 flex items-center gap-2 mb-1">
                           <Stethoscope size={16} /> Điều trị
                        </h4>
                        <p className="text-sm text-gray-700">{pest.treatment}</p>
                      </div>

                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          onAskCategory(`Cách trị ${pest.name} hiệu quả nhất hiện nay là gì?`);
                        }}
                        className="w-full mt-2 bg-emerald-100 text-emerald-700 py-2 rounded-lg text-sm font-semibold hover:bg-emerald-200 transition-colors"
                      >
                        Hỏi thêm chuyên gia về {pest.name}
                      </button>
                   </div>
                </div>
              )}
            </div>
          ))}
          <div className="text-center text-sm text-gray-400 pt-4">
             Dữ liệu được cập nhật từ Viện Nghiên cứu Dầu và Cây có dầu.
          </div>
        </div>
      )}
    </div>
  );
};

export default LibraryPage;
