import React from 'react';
import { Layers, Award, ArrowUpRight, Compass, CheckCircle2 } from 'lucide-react';

export default function ChapterCards({ chapters, onSelectChapterForFlashcards, onSelectChapterForQuiz, masteredByChapter }) {
  return (
    <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4" />
            <span>3 Vùng Đất Tri Thức Cốt Lõi</span>
          </div>
          <h2 className="font-platypi text-3xl sm:text-4xl font-bold text-white">
            Lộ Trình <span className="gold-gradient-text italic">Khám Phá</span> Từng Chương
          </h2>
        </div>
        <p className="text-slate-400 text-sm max-w-md">
          Chọn từng chương để thám hiểm hệ thống lý luận triết học, luyện flashcard và làm bài kiểm tra chuyên sâu.
        </p>
      </div>

      {/* Grid of Chapter Expedition Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {chapters.map((chap, idx) => {
          const masteredCount = masteredByChapter[chap.id] || 0;
          const progressPercent = chap.totalFlashcards > 0 
            ? Math.round((masteredCount / chap.totalFlashcards) * 100) 
            : 0;

          return (
            <div 
              key={chap.id}
              className="glass-panel overflow-hidden flex flex-col justify-between gold-border-glow group transition-all duration-300 hover:-translate-y-1.5"
            >
              {/* Card Image Banner */}
              <div className="relative h-52 overflow-hidden">
                <img 
                  src={chap.coverImage} 
                  alt={chap.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-75" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12161f] via-[#12161f]/40 to-transparent"></div>
                
                {/* Badge Number */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-amber-300 text-xs font-bold font-platypi">
                    {chap.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500/80 text-black text-[11px] font-bold">
                    {chap.badge}
                  </span>
                </div>

                {/* Progress Circle in Banner */}
                <div className="absolute bottom-3 right-4 flex items-center gap-2 bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-xs text-white">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{progressPercent}% thuộc</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-platypi text-xl font-bold text-white mb-2 group-hover:text-amber-300 transition-colors">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-amber-400/90 font-medium italic mb-3">
                    "{chap.tagline}"
                  </p>
                  <p className="text-slate-400 text-xs leading-relaxed mb-4">
                    {chap.description}
                  </p>

                  {/* Key Topics List */}
                  <div className="space-y-1.5 mb-6">
                    <span className="text-[11px] uppercase font-bold text-slate-400 tracking-wider">Trọng tâm:</span>
                    <ul className="space-y-1 text-xs text-slate-300">
                      {chap.keyTopics.slice(0, 3).map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          <span className="line-clamp-1">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-white/10 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={() => onSelectChapterForFlashcards(chap.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-black border border-amber-500/30 text-xs font-semibold transition-all group/btn"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcard</span>
                    <ArrowUpRight className="w-3 h-3 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectChapterForQuiz(chap.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/10 text-xs font-medium transition-all"
                  >
                    <Award className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Thi Trắc Nghiệm</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
