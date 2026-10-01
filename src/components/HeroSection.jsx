import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Flame, Layers, Award, Compass, Sparkles } from 'lucide-react';

export default function HeroSection({ onStartFlashcards, onStartQuiz, totalFlashcards, totalQuestions }) {
  return (
    <>
      {/* Hero Text Section (Unobstructed) */}
      <section className="relative z-10 flex flex-col items-center justify-center pt-32 pb-16 px-4 text-center">
        {/* Top Tagline Pill */}
        <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/5 backdrop-blur-md text-white font-semibold tracking-wide border border-white/10 shadow-sm mb-8">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Khám Phá Triết Học Mác - Lênin (MNL111)</span>
        </div>

        {/* Huge Hero Title */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light tracking-tight text-white leading-[1.1] drop-shadow-2xl max-w-5xl mb-12">
          Khai mở <span className="font-platypi italic font-bold text-amber-400 drop-shadow-md">Tư Duy Biện Chứng</span>
          <br />
          Làm chủ <span className="font-platypi italic font-bold text-amber-400 drop-shadow-md">Tri Thức & Kỳ Thi</span>.
        </h1>

        {/* Action Button */}
        <button 
          onClick={onStartFlashcards}
          className="group flex items-center gap-3 px-8 py-4 rounded-full border border-amber-500/50 bg-amber-500/10 hover:bg-amber-500/20 backdrop-blur-md text-amber-400 font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_30px_rgba(245,158,11,0.4)]"
        >
          <span>Bắt đầu Khám phá</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </section>

      {/* The Masterpiece Artwork (Unobstructed & Framed) */}
      <section className="relative z-0 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="relative w-full rounded-2xl md:rounded-[2rem] overflow-hidden border border-amber-500/20 shadow-[0_0_50px_rgba(0,0,0,0.6)] gold-border-glow">
          <img 
            src="/bg-marx.jpg" 
            alt="Chân dung các vĩ nhân Mác - Lênin" 
            className="w-full h-auto block"
          />
          {/* Subtle inner vignette for cinematic depth */}
          <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.8)] pointer-events-none" />
        </div>
      </section>

      {/* The 3 Feature Cards moved OUT of the hero background, placed directly below it */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel bg-black/30 p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-amber-50 mb-2">3 Chương Chuẩn Hóa</h3>
              <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed">
                Khái luận, CNDV Biện chứng & CNDV Lịch sử được cô đọng theo cấu trúc chuẩn giáo trình Bộ GD&ĐT.
              </p>
            </div>

            <div className="glass-panel bg-black/30 p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-amber-50 mb-2">{totalFlashcards}+ Thẻ Ghi Nhớ 3D</h3>
              <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed">
                Lật thẻ 2 mặt 3D, ghi nhớ định nghĩa kinh điển của Lênin, 3 quy luật và các mẹo nhớ nhanh (mnemonics).
              </p>
            </div>

            <div className="glass-panel bg-black/30 p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-amber-50 mb-2">{totalQuestions}+ Câu Trắc Nghiệm</h3>
              <p className="text-xs sm:text-sm text-amber-100/70 leading-relaxed">
                Luyện tập có giải thích chi tiết, hoặc thi thử áp lực thời gian mô phỏng phòng thi đại học.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

