import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Flame, Layers, Award, Compass, Sparkles } from 'lucide-react';

export default function HeroSection({ onStartFlashcards, onStartQuiz, totalFlashcards, totalQuestions }) {
  return (
    <>
      {/* Full Screen Hero Container */}
      <section className="relative z-0 min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        {/* Masked Background Container for seamless transition */}
        <div 
          className="absolute inset-0 z-[-2]"
          style={{ 
            WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)',
            maskImage: 'linear-gradient(to top, transparent 0%, black 15%, black 100%)'
          }}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat saturate-[1.15] contrast-[1.1]"
            style={{ backgroundImage: `url('/bg-marx-extended.jpg')` }}
          />
          {/* A gradient that is darker on the left to ensure text readability without hiding the faces */}
          <div className="absolute inset-0 bg-black/20 bg-gradient-to-r from-black/90 via-black/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#271010]/80 via-transparent to-transparent" />
        </div>

        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-start flex-1 justify-center pb-24">
          
          {/* Top Tagline Pill - Left Aligned */}
          <div className="flex justify-start mb-8">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-black/40 backdrop-blur-sm text-white font-semibold tracking-wide border border-white/10 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Khám Phá Triết Học Mác - Lênin (MNL111)</span>
            </div>
          </div>

          <div className="text-left w-full max-w-[800px] mb-10">
            <h1 className="text-4xl md:text-5xl lg:text-[48px] font-light tracking-tight text-white leading-snug drop-shadow-2xl">
              Khai mở <span className="font-platypi italic font-bold text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Tư Duy Biện Chứng</span>
              <br className="hidden md:block" />
              Làm chủ <span className="font-platypi italic font-bold text-amber-400 drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]">Tri Thức & Kỳ Thi</span>.
            </h1>
          </div>

          {/* Action Button - Left Aligned */}
          <button 
            onClick={onStartFlashcards}
            className="group flex items-center gap-3 px-8 py-4 rounded-full border border-amber-500/40 bg-amber-500/15 hover:bg-amber-500/25 backdrop-blur-md text-amber-400 font-bold text-lg transition-all shadow-[0_0_20px_rgba(245,158,11,0.15)] hover:shadow-[0_0_30px_rgba(245,158,11,0.3)]"
          >
            <span>Bắt đầu Khám phá</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
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

