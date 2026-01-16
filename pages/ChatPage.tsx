import React, { useEffect, useRef, useState } from 'react';
import { Message, Sender, RegionInfo, WeatherData } from '../types';
import UserMessage from '../components/UserMessage';
import BotMessage from '../components/BotMessage';
import { Send, Image as ImageIcon, MapPin } from 'lucide-react';
import { generateTextResponse } from '../services/geminiService';

interface ChatPageProps {
  initialPrompt?: string;
  clearInitialPrompt: () => void;
  selectedRegion: RegionInfo;
  weatherData: WeatherData;
}

const ChatPage: React.FC<ChatPageProps> = ({ initialPrompt, clearInitialPrompt, selectedRegion, weatherData }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      text: `Chào bà con! Tôi là Kỹ sư Dừa Việt, chuyên trách vùng ${selectedRegion.name}. Bà con cần tư vấn gì về kỹ thuật trồng, chăm sóc hay sâu bệnh hôm nay?`,
      sender: Sender.BOT,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (initialPrompt) {
      handleSendMessage(initialPrompt);
      clearInitialPrompt();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialPrompt]);

  // Update welcome message if region changes and conversation hasn't started essentially (just welcome msg)
  useEffect(() => {
      if (messages.length === 1 && messages[0].id === 'welcome') {
         setMessages([{
            id: 'welcome',
            text: `Chào bà con! Tôi là Kỹ sư Dừa Việt, chuyên trách vùng ${selectedRegion.name}. Bà con cần tư vấn gì về kỹ thuật trồng, chăm sóc hay sâu bệnh hôm nay?`,
            sender: Sender.BOT,
            timestamp: new Date()
         }]);
      }
  }, [selectedRegion, messages.length]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      text: text,
      sender: Sender.USER,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    // Add loading placeholder
    const loadingId = 'loading-' + Date.now();
    setMessages(prev => [...prev, {
      id: loadingId,
      text: '...',
      sender: Sender.BOT,
      timestamp: new Date(),
      isLoading: true
    }]);

    try {
      // Prepare history for context
      const history = messages
        .filter(m => !m.isLoading && m.id !== 'welcome') // simple filter
        .map(m => ({
          role: m.sender === Sender.USER ? 'user' : 'model',
          parts: [{ text: m.text }]
        }));

      // Pass selected region and weather data to the service
      const responseText = await generateTextResponse(text, history, selectedRegion.name, weatherData);

      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== loadingId);
        return [...filtered, {
          id: Date.now().toString(),
          text: responseText,
          sender: Sender.BOT,
          timestamp: new Date()
        }];
      });
    } catch (error) {
      setMessages(prev => {
        const filtered = prev.filter(m => m.id !== loadingId);
        return [...filtered, {
          id: Date.now().toString(),
          text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
          sender: Sender.BOT,
          timestamp: new Date()
        }];
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(inputValue);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] lg:h-screen bg-gray-50">
      {/* Region Indicator in Chat */}
      <div className="bg-emerald-50 py-1 px-4 text-xs text-emerald-700 text-center border-b border-emerald-100 flex justify-center items-center gap-1">
         <MapPin size={12} /> Đang tư vấn cho vùng: <strong>{selectedRegion.name}</strong>
         {!weatherData.loading && !weatherData.error && (
             <span className="ml-2 text-gray-500">| 🌡️ {weatherData.temp}°C - {weatherData.description}</span>
         )}
      </div>

      <div className="flex-1 overflow-y-auto pt-4 pb-4">
        {messages.map((msg) => (
          msg.sender === Sender.USER 
            ? <UserMessage key={msg.id} message={msg} /> 
            : <BotMessage key={msg.id} message={msg} />
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-200 p-3 lg:p-4">
        <div className="max-w-3xl mx-auto relative flex items-end gap-2 bg-gray-100 rounded-2xl p-2">
            <button className="p-2 text-gray-400 hover:text-emerald-600 transition-colors">
                 <ImageIcon size={24} />
            </button>
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Nhập câu hỏi tại đây..."
              className="flex-1 bg-transparent border-none focus:ring-0 resize-none max-h-32 py-3 text-gray-800 placeholder-gray-500"
              rows={1}
              style={{ minHeight: '44px' }}
            />
            <button 
              onClick={() => handleSendMessage(inputValue)}
              disabled={!inputValue.trim() || isLoading}
              className={`p-2 rounded-xl mb-1 ${
                inputValue.trim() && !isLoading
                  ? 'bg-emerald-600 text-white shadow-md hover:bg-emerald-700' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              } transition-all`}
            >
              <Send size={20} />
            </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
