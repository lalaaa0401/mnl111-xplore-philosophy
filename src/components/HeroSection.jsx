import React from 'react';
import { Sparkles, ArrowRight, BookOpen, CheckCircle, ShieldCheck, Flame } from 'lucide-react';

export default function HeroSection({ onStartFlashcards, onStartQuiz, totalFlashcards, totalQuestions }) {
  return (
    <div className="relative pt-28 pb-12 lg:pt-36 lg:pb-16 overflow-hidden">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-500/10 via-emerald-500/5 to-transparent blur-3xl pointer-events-none -z-10"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-6 animate-float">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Hành Trình Khám Phá Triết Học Mác - Lênin (MNL111)</span>
        </div>

        {/* Grand Headline with Editorial Platypi font */}
        <h1 className="font-platypi text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.15] mb-6">
          Khai Mở Tư Duy <span className="gold-gradient-text italic">Biện Chứng</span> & Làm Chủ Tri Thức
        </h1>

        {/* Famous Quote */}
        <div className="max-w-2xl mx-auto mb-8 p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-sm">
          <p className="font-platypi italic text-slate-300 text-base sm:text-lg leading-relaxed">
            "Các nhà triết học từ trước đến nay chỉ giải thích thế giới bằng nhiều cách khác nhau; song vấn đề là cải tạo thế giới."
          </p>
          <span className="text-xs uppercase tracking-widest text-amber-400 font-semibold mt-2 block">
            — Karl Marx, Luận Cương Về Feuerbach (1845)
          </span>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button 
            onClick={onStartFlashcards}
            className="btn-gold text-base py-3.5 px-8 shadow-xl shadow-amber-500/20"
          >
            <span>Bắt đầu Luyện Flashcard</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <button 
            onClick={onStartQuiz}
            className="btn-ghost text-base py-3.5 px-7"
          >
            <Flame className="w-5 h-5 text-amber-400" />
            <span>Vào Thi Thử Trắc Nghiệm</span>
          </button>
        </div>

        {/* 3 Quick Metric Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto text-left">
          <div className="glass-panel p-6 gold-border-glow transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">3 Chương Chuẩn Hóa</div>
            <p className="text-sm text-slate-400">
              Khái luận, CNDV Biện chứng và CNDV Lịch sử được cô đọng theo cấu trúc giáo trình Bộ GD&ĐT.
            </p>
          </div>

          <div className="glass-panel p-6 gold-border-glow transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{totalFlashcards}+ Thẻ Ghi Nhớ 3D</div>
            <p className="text-sm text-slate-400">
              Lật thẻ 2 mặt, ghi nhớ định nghĩa kinh điển của Lênin, 3 quy luật và các mẹo nhớ nhanh (mnemonics).
            </p>
          </div>

          <div className="glass-panel p-6 gold-border-glow transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div className="text-2xl font-bold text-white mb-1">{totalQuestions}+ Câu Trắc Nghiệm</div>
            <p className="text-sm text-slate-400">
              Luyện tập có giải thích chi tiết, hoặc thi thử áp lực thời gian mô phỏng phòng thi đại học.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
