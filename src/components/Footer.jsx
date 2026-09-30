import React from 'react';
import { Compass, BookOpen, Heart, Sparkles, ArrowRight } from 'lucide-react';

export default function Footer({ onOpenGlossary, onNavigate }) {
  return (
    <footer className="border-t border-slate-900/10 bg-slate-100 pt-16 pb-12 text-slate-600 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Col 1 - Brand */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-bold shadow-md shadow-amber-500/20">
                <Compass className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-platypi text-xl font-bold text-slate-900 tracking-tight">
                Dialectica<span className="text-amber-600">.</span> Triết Học
              </span>
            </div>
            <p className="text-slate-600 text-xs sm:text-sm max-w-md leading-relaxed font-light">
              Nền tảng học tập tương tác môn Triết học Mác - Lênin (MNL111). Chuyển hóa lý luận trừu tượng thành công cụ tư duy thực tiễn qua Flashcard 3D và ngân hàng đề trắc nghiệm chuẩn hóa.
            </p>
          </div>

          {/* Col 2 - Navigation */}
          <div>
            <h4 className="font-platypi text-sm font-bold text-slate-900 mb-4 tracking-wide uppercase">Lối Tắt Học Tập</h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-amber-600 transition-colors cursor-pointer">
                  Lộ trình 3 Chương
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flashcards')} className="hover:text-amber-600 transition-colors cursor-pointer">
                  Flashcard 3D Spaced Repetition
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-amber-600 transition-colors cursor-pointer">
                  Phòng thi trắc nghiệm bấm giờ
                </button>
              </li>
              <li>
                <button onClick={onOpenGlossary} className="hover:text-amber-600 transition-colors cursor-pointer">
                  Tra cứu thuật ngữ (Ctrl + K)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 - References */}
          <div>
            <h4 className="font-platypi text-sm font-bold text-slate-900 mb-4 tracking-wide uppercase">Tài Liệu Cốt Lõi</h4>
            <ul className="space-y-2.5 text-xs text-slate-600">
              <li>Giáo trình Triết học Mác - Lênin (Bộ GD&ĐT)</li>
              <li>Luận cương về Feuerbach (K. Marx)</li>
              <li>Chủ nghĩa duy vật & CN kinh nghiệm phê phán (V.I. Lenin)</li>
              <li>Biện chứng của tự nhiên (F. Engels)</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-900/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>© 2026 Dialectica Philosophy (MNL111). Khơi nguồn cảm hứng từ triết học biện chứng.</p>
          <div className="flex items-center gap-1.5 text-slate-600">
            <span>Học sâu sắc • Tư duy đa chiều • Đạt điểm cao</span>
            <Sparkles className="w-3 h-3 text-amber-600" />
          </div>
        </div>
      </div>
    </footer>
  );
}
