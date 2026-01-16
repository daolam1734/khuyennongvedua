import React, { useState } from 'react';
import { Users, Filter, PlusCircle, MessageSquare, Heart, Share2, Pin } from 'lucide-react';
import { MOCK_FORUM_POSTS } from '../constants';
import { ForumPost } from '../types';

interface ForumPageProps {
  onAskAdvice: (prompt: string) => void;
}

const ForumPage: React.FC<ForumPageProps> = ({ onAskAdvice }) => {
  const [filter, setFilter] = useState<'all' | 'kithuat' | 'thitruong' | 'saubenh' | 'muaban'>('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const filteredPosts = filter === 'all' 
    ? MOCK_FORUM_POSTS 
    : MOCK_FORUM_POSTS.filter(p => p.category === filter);

  const getCategoryLabel = (cat: string) => {
    switch(cat) {
      case 'kithuat': return { label: 'Kỹ thuật', color: 'bg-blue-100 text-blue-700' };
      case 'thitruong': return { label: 'Thị trường', color: 'bg-yellow-100 text-yellow-700' };
      case 'saubenh': return { label: 'Sâu bệnh', color: 'bg-red-100 text-red-700' };
      case 'muaban': return { label: 'Mua bán', color: 'bg-emerald-100 text-emerald-700' };
      default: return { label: 'Thảo luận', color: 'bg-gray-100 text-gray-700' };
    }
  };

  return (
    <div className="p-4 md:p-8 pb-24 lg:pb-8 max-w-4xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
           <h2 className="text-2xl font-bold text-emerald-900 flex items-center gap-2">
             <Users className="text-emerald-600" /> Diễn đàn Nhà nông
           </h2>
           <p className="text-sm text-gray-500">Nơi chia sẻ kinh nghiệm và hỏi đáp cộng đồng.</p>
        </div>
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-medium shadow-md hover:bg-emerald-700 transition-colors flex items-center gap-2 w-full md:w-auto justify-center"
        >
          <PlusCircle size={18} /> Đăng bài mới
        </button>
      </div>

      {/* Categories Filter */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar pb-4">
         <button 
           onClick={() => setFilter('all')}
           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'all' ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
         >
           Tất cả
         </button>
         <button 
           onClick={() => setFilter('thitruong')}
           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'thitruong' ? 'bg-yellow-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-yellow-50'}`}
         >
           💰 Giá cả thị trường
         </button>
         <button 
           onClick={() => setFilter('saubenh')}
           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'saubenh' ? 'bg-red-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-red-50'}`}
         >
           🐛 Sâu bệnh
         </button>
         <button 
           onClick={() => setFilter('kithuat')}
           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'kithuat' ? 'bg-blue-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-blue-50'}`}
         >
           🛠️ Kỹ thuật
         </button>
         <button 
           onClick={() => setFilter('muaban')}
           className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === 'muaban' ? 'bg-emerald-500 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-emerald-50'}`}
         >
           🤝 Mua bán giống
         </button>
      </div>

      {/* Posts Feed */}
      <div className="space-y-4 animate-fade-in">
        {filteredPosts.map((post) => {
           const catStyle = getCategoryLabel(post.category);
           return (
             <div key={post.id} className="bg-white p-4 md:p-5 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                   <div className="flex items-center gap-3">
                      <img src={post.avatar} alt={post.author} className="w-10 h-10 rounded-full bg-gray-200" />
                      <div>
                         <h3 className="font-bold text-gray-900 text-sm">{post.author}</h3>
                         <div className="flex items-center gap-2 text-xs text-gray-500">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-semibold border ${post.role === 'Chuyên gia' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-600 border-gray-200'}`}>
                                {post.role}
                            </span>
                            <span>• {post.timestamp}</span>
                         </div>
                      </div>
                   </div>
                   {post.isPinned && (
                      <Pin size={16} className="text-orange-500 fill-orange-500 rotate-45" />
                   )}
                </div>

                <div className="mb-3">
                   <div className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-2 ${catStyle.color}`}>
                      {catStyle.label}
                   </div>
                   <h3 className="font-bold text-gray-900 text-lg mb-2">{post.title}</h3>
                   <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">{post.content}</p>
                </div>

                {post.images && post.images.length > 0 && (
                   <div className="mb-4">
                      <img src={post.images[0]} alt="Post attachment" className="rounded-lg max-h-60 w-full object-cover border border-gray-100" />
                   </div>
                )}

                <div className="flex items-center justify-between border-t border-gray-100 pt-3 text-gray-500 text-sm">
                   <div className="flex gap-4">
                      <button className="flex items-center gap-1 hover:text-emerald-600 transition-colors">
                         <Heart size={18} /> <span>{post.likes}</span>
                      </button>
                      <button className="flex items-center gap-1 hover:text-blue-600 transition-colors">
                         <MessageSquare size={18} /> <span>{post.comments}</span>
                      </button>
                   </div>
                   <button 
                      onClick={() => onAskAdvice(`Hãy phân tích và cho lời khuyên về vấn đề này trong diễn đàn: "${post.title} - ${post.content}"`)}
                      className="text-emerald-600 font-medium text-xs hover:underline flex items-center gap-1"
                   >
                      <MessageSquare size={14} /> Hỏi AI về việc này
                   </button>
                </div>
             </div>
           );
        })}
      </div>

      {/* Create Post Modal Mock */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
           <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-xl">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Đăng bài thảo luận</h3>
              <div className="space-y-4">
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Tiêu đề</label>
                    <input type="text" className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Vắn tắt vấn đề..." />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Chuyên mục</label>
                    <select className="w-full border border-gray-300 rounded-lg p-2 bg-white">
                       <option value="kithuat">Kỹ thuật</option>
                       <option value="thitruong">Thị trường</option>
                       <option value="saubenh">Sâu bệnh</option>
                       <option value="muaban">Mua bán</option>
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Nội dung</label>
                    <textarea className="w-full border border-gray-300 rounded-lg p-2 h-32 resize-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500" placeholder="Chi tiết vấn đề bạn muốn chia sẻ..."></textarea>
                 </div>
                 <div className="flex gap-3 justify-end pt-2">
                    <button 
                       onClick={() => setIsCreateModalOpen(false)}
                       className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium"
                    >
                       Hủy
                    </button>
                    <button 
                       onClick={() => {
                          alert("Tính năng đăng bài đang được phát triển!");
                          setIsCreateModalOpen(false);
                       }}
                       className="px-4 py-2 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700"
                    >
                       Đăng bài
                    </button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ForumPage;