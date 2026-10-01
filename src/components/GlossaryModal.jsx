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
        className="glass-panel w-full max-w-3xl max-h-[85vh] flex flex-col border border-amber-500/20 bg-[#271010] shadow-2xl rounded-3xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-amber-500/20 flex items-center justify-between bg-black/30">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-platypi text-lg font-bold text-amber-50">La Bàn Thuật Ngữ Triết Học</h3>
              <p className="text-[11px] text-amber-100/70">Tra cứu nhanh hơn 40 khái niệm & thuật ngữ cốt lõi</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/30 text-amber-100 hover:text-amber-400 transition-colors border border-amber-500/20"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Input & Filter Bar */}
        <div className="p-4 bg-black/30 border-b border-amber-500/20 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-amber-500/70 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Nhập thuật ngữ (VD: Vật chất, Ý thức, Độ, Lực lượng sản xuất, Tha hóa...)"
              autoFocus
              className="w-full bg-black/30 border border-amber-500/30 rounded-2xl pl-10 pr-4 py-3 text-sm text-amber-50 placeholder-amber-100/50 shadow-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/20 transition-all"
            />
          </div>

          {/* Chapter filter pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {['all', 'Chương I', 'Chương II', 'Chương III'].map((filter) => (
              <button
                key={filter}
                onClick={() => setSelectedFilter(filter)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                  selectedFilter === filter
                    ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                    : 'bg-black/30 border-amber-500/20 text-amber-100 hover:bg-black/30'
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
            <div className="py-12 text-center text-amber-100/50 text-sm">
              Không tìm thấy thuật ngữ phù hợp với từ khóa "{searchTerm}".
            </div>
          ) : (
            filteredGlossary.map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-black/30 hover:bg-black/30 border border-amber-500/20 shadow-sm transition-all"
              >
                <div className="flex items-start justify-between gap-3 mb-1.5">
                  <div className="flex items-center gap-2">
                    <h4 className="font-platypi text-base font-bold text-amber-400">
                      {item.term}
                    </h4>
                    {item.pinyinOrAlias && (
                      <span className="text-xs text-amber-200/70 font-mono italic">
                        ({item.pinyinOrAlias})
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-black/30 border border-amber-500/30 text-amber-300 font-medium shrink-0">
                    {item.chapter}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-amber-50 mb-1.5 font-medium">
                  {item.shortDef}
                </p>

                {item.extended && (
                  <p className="text-xs text-amber-100/80 leading-relaxed border-t border-amber-500/20 pt-1.5 mt-1.5">
                    {item.extended}
                  </p>
                )}
              </div>
            ))
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-3 bg-black/30 border-t border-amber-500/20 text-center text-[11px] text-amber-100/50 flex items-center justify-center gap-2">
          <span>Nhấn <strong>Esc</strong> hoặc click ra ngoài để đóng</span>
        </div>
      </div>
    </div>
  );
}
