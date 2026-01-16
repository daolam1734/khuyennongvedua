import React from 'react';
import { Message } from '../types';
import { User } from 'lucide-react';

interface UserMessageProps {
  message: Message;
}

const UserMessage: React.FC<UserMessageProps> = ({ message }) => {
  return (
    <div className="flex w-full mt-2 space-x-3 max-w-3xl mx-auto px-4 justify-end">
      <div className="flex-1 bg-emerald-600 p-4 rounded-l-xl rounded-br-xl shadow-md text-white text-sm md:text-base leading-relaxed">
        {message.imageUrl && (
          <img 
            src={message.imageUrl} 
            alt="User upload" 
            className="w-full h-48 object-cover rounded-lg mb-2 border border-emerald-500"
          />
        )}
        <p className="whitespace-pre-wrap">{message.text}</p>
        <span className="text-xs text-emerald-200 mt-2 block text-right">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-emerald-800 flex items-center justify-center border border-emerald-700">
        <User className="h-6 w-6 text-emerald-100" />
      </div>
    </div>
  );
};

export default UserMessage;
