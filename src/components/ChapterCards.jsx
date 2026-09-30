import React from 'react';
import { Layers, Award, ArrowUpRight, Compass, CheckCircle2, Sparkles } from 'lucide-react';

export default function ChapterCards({ chapters, onSelectChapterForFlashcards, onSelectChapterForQuiz, masteredByChapter }) {
  return (
    <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-900/10">
      {/* Section Header - Exactly like Figma "Must experience Packages" */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
        <div>
          <div className="inline-flex items-center gap-2 text-amber-600 text-xs font-bold uppercase tracking-wider mb-3">
            <Compass className="w-4 h-4" />
            <span>3 Vùng Đất Tri Thức Cốt Lõi</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-light text-slate-900 tracking-tight">
            Lộ Trình <span className="font-platypi italic font-normal text-amber-600">Khám Phá</span> Từng Chương
          </h2>
        </div>
        <p className="text-slate-600 text-sm max-w-lg leading-relaxed">
          Được thiết kế theo đúng lộ trình môn học, giúp sinh viên nắm chắc từ căn bản bản thể luận, nhận thức luận đến quy luật vận động của xã hội.
        </p>
      </div>

      {/* Grid of Chapter Expedition Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapters.map((chap) => {
          const masteredCount = masteredByChapter[chap.id] || 0;
          const progressPercent = chap.totalFlashcards > 0 
            ? Math.round((masteredCount / chap.totalFlashcards) * 100) 
            : 0;

          return (
            <div 
              key={chap.id}
              className="group glass-panel rounded-[24px] overflow-hidden flex flex-col justify-between gold-border-glow transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Card Image Banner */}
              <div className="relative h-56 overflow-hidden bg-slate-900">
                <img 
                  src={chap.coverImage} 
                  alt={chap.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-70" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#12161d] via-[#12161d]/30 to-transparent"></div>
                
                {/* Top Badges */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/80 backdrop-blur-md border border-slate-900/10 text-amber-600 text-xs font-bold font-platypi">
                    {chap.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-500 text-slate-950 text-[11px] font-bold">
                    {chap.badge}
                  </span>
                </div>

                {/* Progress Badge */}
                <div className="absolute bottom-3 right-4 flex items-center gap-1.5 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-900/10 text-xs text-slate-900">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{progressPercent}% thuộc ({masteredCount}/{chap.totalFlashcards})</span>
                </div>
              </div>

              {/* Card Content Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-platypi text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-600 transition-colors">
                    {chap.title}
                  </h3>
                  <p className="text-xs text-amber-600/90 font-medium italic mb-3">
                    "{chap.tagline}"
                  </p>
                  <p className="text-slate-600 text-xs leading-relaxed mb-5">
                    {chap.description}
                  </p>

                  {/* Key Topics */}
                  <div className="space-y-2 mb-6">
                    <span className="text-[10px] uppercase font-bold text-slate-600 tracking-wider">Trọng tâm cốt lõi:</span>
                    <ul className="space-y-1.5 text-xs text-slate-700">
                      {chap.keyTopics.slice(0, 3).map((topic, tIdx) => (
                        <li key={tIdx} className="flex items-start gap-2">
                          <span className="text-amber-600 mt-0.5">•</span>
                          <span className="line-clamp-1">{topic}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-slate-900/10 grid grid-cols-2 gap-3">
                  <button
                    onClick={() => onSelectChapterForFlashcards(chap.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-amber-600/10 hover:bg-amber-500 text-amber-600 hover:text-amber-700 border border-amber-600/30 text-xs font-semibold transition-all group/btn cursor-pointer"
                  >
                    <Layers className="w-3.5 h-3.5" />
                    <span>Flashcard</span>
                    <ArrowUpRight className="w-3 h-3 opacity-70 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                  </button>

                  <button
                    onClick={() => onSelectChapterForQuiz(chap.id)}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900/5 hover:bg-slate-900/10 text-slate-800 hover:text-slate-900 border border-slate-900/10 text-xs font-medium transition-all cursor-pointer"
                  >
                    <Award className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Thi Thử</span>
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
