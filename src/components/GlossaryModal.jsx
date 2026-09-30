import React, { useState, useEffect } from 'react';
import { Search, X, BookOpen, Sparkles, Compass } from 'lucide-react';

export default function GlossaryModal({ isOpen, onClose, glossary }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredGlossary = glossary.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.pinyinOrAlias && item.pinyinOrAlias.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.shortDef.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesChapter = selectedFilter === 'all' || item.chapter === selectedFilter;
    return matchesSearch && matchesChapter;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="glass-panel w-full max-w-3xl max-h-[85vh] flex flex-col border border-slate-900/20 bg-[#0f1217] shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-900/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-600 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-platypi text-lg font-bold text-slate-900">La Bàn Thuật Ngữ Triết Học</h3>
              <p className="text-[11px] text-slate-600">Tra cứu nhanh hơn 40 khái niệm & thuật ngữ cốt lõi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900/5 hover:bg-slate-900/10 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input & Filter Bar */}
        <div className="p-4 bg-slate-900/50 border-b border-slate-900/10 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập thuật ngữ (VD: Vật chất, Ý thức, Độ, Lực lượng sản xuất, Tha hóa...)"
              autoFocus
              className="w-full bg-black/50 border border-slate-900/10 rounded-2xl pl-10 pr-4 py-3 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40"
            />
          </div>

          {/* Chapter filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['all', 'Chương I', 'Chương II', 'Chương III'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedFilter === filter
                    ? 'bg-amber-500 text-black shadow-md'
                    : 'bg-slate-900/5 text-slate-600 hover:text-slate-900'
                }`}
              >
                {filter === 'all' ? 'Tất Cả' : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Glossary Results List */}
        <div className="p-4 overflow-y-auto space-y-3 flex-1">
          {filteredGlossary.length === 0 ? (
            <div className="py-12 text-center text-slate-500 text-sm">
              Không tìm thấy thuật ngữ phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredGlossary.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-white/[0.03] hover:bg-slate-900/5 border border-white/5 transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-platypi text-base font-bold text-slate-900 text-amber-600">
                      {item.term}
                    </h4>
                    {item.pinyinOrAlias && (
                      <span className="text-xs text-slate-600 font-mono italic">
                        ({item.pinyinOrAlias})
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900/5 border border-slate-900/10 text-slate-700 font-medium shrink-0">
                    {item.chapter}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 mb-1.5 font-medium">
                  {item.shortDef}
                </p>

                {item.extended && (
                  <p className="text-xs text-slate-600 leading-relaxed border-t border-white/5 pt-1.5 mt-1.5">
                    {item.extended}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-black/50 border-t border-white/5 text-center text-[11px] text-slate-500 flex items-center justify-center gap-2">
          <span>Nhấn <strong>Esc</strong> hoặc click ra ngoài để đóng</span>
        </div>
      </div>
    </div>
  );
}
