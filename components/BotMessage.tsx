import React from 'react';
import { Message } from '../types';
import { Sprout } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface BotMessageProps {
  message: Message;
}

const BotMessage: React.FC<BotMessageProps> = ({ message }) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-3xl mx-auto px-4">
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center border border-emerald-200">
        <Sprout className="h-6 w-6 text-emerald-600" />
      </div>
      <div className="flex-1 bg-white p-4 rounded-r-xl rounded-bl-xl shadow-sm border border-gray-100 text-gray-800 text-sm md:text-base leading-relaxed">
        {message.isLoading ? (
          <div className="flex items-center gap-3 py-1">
             <div className="flex space-x-1">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
             </div>
             <span className="text-xs text-emerald-600 font-medium animate-pulse">Kỹ sư đang suy nghĩ...</span>
          </div>
        ) : (
          <div className="prose prose-sm prose-emerald max-w-none">
             {/* Using a simple text render for now, but ready for markdown */}
             <ReactMarkdown>{message.text}</ReactMarkdown>
          </div>
        )}
        <span className="text-xs text-gray-400 mt-2 block">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </div>
  );
};

export default BotMessage;