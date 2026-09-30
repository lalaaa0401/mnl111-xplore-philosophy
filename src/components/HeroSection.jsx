import React from 'react';
import { ArrowRight, BookOpen, CheckCircle, Flame, Layers, Award, Compass, Sparkles } from 'lucide-react';
import heroBg from '../assets/hero-bg.jpg';

export default function HeroSection({ onStartFlashcards, onStartQuiz, totalFlashcards, totalQuestions }) {
  return (
    <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div 
        className="absolute inset-0 z-[-2] bg-cover bg-center bg-no-repeat opacity-30"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 z-[-1] bg-gradient-to-b from-[#090b0e]/80 via-[#090b0e]/95 to-[#090b0e]" />

      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none -z-10" />


      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Tagline Pill - Exactly like Figma */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md text-amber-300 text-xs sm:text-sm font-medium tracking-wide shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Hành Trình Tự Học & Ôn Thi Đột Phá (MNL111)</span>
          </div>
        </div>

        {/* Hero Editorial Heading - Figma typography style */}
        <div className="text-center max-w-4xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-[1.2]">
            Khai mở <span className="font-platypi italic font-normal text-amber-300">Tư Duy Biện Chứng</span>
            <br />
            Làm chủ <span className="font-platypi italic font-normal text-amber-300">Tri Thức & Kỳ Thi</span>.
          </h1>
          <p className="mt-6 text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
            Hệ thống hóa toàn bộ tri thức Triết học Mác - Lênin qua phương pháp <strong className="text-white font-medium">Flashcard 3D Spaced Repetition</strong> và <strong className="text-white font-medium">Phòng thi trắc nghiệm bấm giờ</strong> bám sát đề thi đại học.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button 
            onClick={onStartFlashcards}
            className="btn-gold group text-sm sm:text-base py-3.5 px-8 shadow-xl shadow-amber-500/20"
          >
            <span>Bắt đầu Luyện Flashcard</span>
            <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center group-hover:translate-x-1 transition-transform">
              <ArrowRight className="w-4 h-4 text-slate-950" />
            </div>
          </button>
          
          <button 
            onClick={onStartQuiz}
            className="btn-ghost text-sm sm:text-base py-3.5 px-7"
          >
            <Flame className="w-4 h-4 text-amber-400" />
            <span>Vào Thi Thử Trắc Nghiệm</span>
          </button>
        </div>

        {/* 3 Core Value Cards - Figma 'Our true beliefs' card style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="glass-panel p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="font-platypi text-xl font-bold text-white mb-2">3 Chương Chuẩn Hóa</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Khái luận, CNDV Biện chứng & CNDV Lịch sử được cô đọng theo cấu trúc chuẩn giáo trình Bộ GD&ĐT.
            </p>
          </div>

          <div className="glass-panel p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-5">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="font-platypi text-xl font-bold text-white mb-2">{totalFlashcards}+ Thẻ Ghi Nhớ 3D</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Lật thẻ 2 mặt 3D, ghi nhớ định nghĩa kinh điển của Lênin, 3 quy luật và các mẹo nhớ nhanh (mnemonics).
            </p>
          </div>

          <div className="glass-panel p-7 gold-border-glow transition-all duration-300 hover:-translate-y-1">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-5">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-platypi text-xl font-bold text-white mb-2">{totalQuestions}+ Câu Trắc Nghiệm</h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Luyện tập có giải thích chi tiết, hoặc thi thử áp lực thời gian mô phỏng phòng thi đại học.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
