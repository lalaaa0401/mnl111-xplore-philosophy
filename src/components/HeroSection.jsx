import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Flame, Layers, Award, Compass, Sparkles } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

export default function HeroSection({ onStartFlashcards, onStartQuiz, totalFlashcards, totalQuestions }) {
  return (
    <>
      {/* Full Screen Hero Container */}
      <section className="relative z-0 min-h-screen flex flex-col justify-center overflow-hidden pt-20">
        {/* Background Image */}
        <div 
          className="absolute inset-0 z-[-2] bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        {/* Subtle Dark Overlay to ensure text readability on the generated dark image */}
        <div className="absolute inset-0 z-[-1] bg-white/40 bg-gradient-to-b from-transparent via-black/20 to-slate-50" />


        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 flex flex-col items-center flex-1 justify-center pb-24">
          
          {/* Top Tagline Pill - Centered */}
          <div className="flex justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-slate-900/15 backdrop-blur-md text-slate-900 font-semibold tracking-wide border border-slate-900/30 shadow-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Khám Phá Triết Học Mác - Lênin (MNL111)</span>
            </div>
          </div>

          {/* Huge Hero Title - Centered */}
          <div className="text-center w-full max-w-5xl mx-auto mb-auto">
            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[80px] font-light tracking-tight text-slate-900 leading-[1.1] drop-shadow-lg">
              Khai mở <span className="font-platypi italic font-normal text-amber-600">Tư Duy Biện Chứng</span>
              <br />
              Làm chủ <span className="font-platypi italic font-normal text-amber-600">Tri Thức & Kỳ Thi</span>.
            </h1>
          </div>

          {/* Bottom row (Left: text, Right: button) - Like Figma */}
          <div className="w-full flex flex-col md:flex-row items-end justify-end gap-8 mt-12 md:mt-24">

            <button 
              onClick={onStartFlashcards}
              className="group flex items-center gap-3 px-8 py-3.5 rounded-full border border-slate-900/40 bg-slate-900/5 hover:bg-slate-900/15 backdrop-blur-sm text-slate-900 font-bold text-lg transition-all shadow-sm"
            >
              <span>Bắt đầu Khám phá</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* The 3 Feature Cards moved OUT of the hero background, placed directly below it */}
      <section className="bg-slate-50 py-16 -mt-10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-amber-600/10 border border-amber-600/30 flex items-center justify-center text-amber-600 mb-5">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-slate-900 mb-2">3 Chương Chuẩn Hóa</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Khái luận, CNDV Biện chứng & CNDV Lịch sử được cô đọng theo cấu trúc chuẩn giáo trình Bộ GD&ĐT.
              </p>
            </div>

            <div className="glass-panel p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-600 mb-5">
                <CheckCircle className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-slate-900 mb-2">{totalFlashcards}+ Thẻ Ghi Nhớ 3D</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Lật thẻ 2 mặt 3D, ghi nhớ định nghĩa kinh điển của Lênin, 3 quy luật và các mẹo nhớ nhanh (mnemonics).
              </p>
            </div>

            <div className="glass-panel p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-600 mb-5">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-slate-900 mb-2">{totalQuestions}+ Câu Trắc Nghiệm</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Luyện tập có giải thích chi tiết, hoặc thi thử áp lực thời gian mô phỏng phòng thi đại học.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

