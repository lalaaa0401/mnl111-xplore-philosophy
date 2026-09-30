import React from 'react';
import { Compass, BookOpen, Heart, Sparkles } from 'lucide-react';

export default function Footer({ onOpenGlossary, onNavigate }) {
  return (
    <footer className="border-t border-white/10 bg-[#090b0e] py-12 mt-16 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Col 1 */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 text-black flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-platypi text-lg font-bold text-white tracking-tight">
                XPLORE PHILOSOPHY (MNL111)
              </span>
            </div>
            <p className="text-slate-400 text-xs max-w-sm leading-relaxed">
              Nền tảng tự học & ôn thi trắc nghiệm môn Triết học Mác - Lênin với phương pháp Flashcard 3D và ngân hàng đề thi bám sát chuẩn chương trình đại học.
            </p>
          </div>

          {/* Col 2 */}
          <div>
            <h5 className="font-platypi text-white font-bold mb-3">Lối Tắt Học Tập</h5>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('overview')} className="hover:text-amber-400 transition-colors">
                  Lộ trình 3 Chương lớn
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('flashcards')} className="hover:text-amber-400 transition-colors">
                  Flashcard lật thẻ 3D
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('quiz')} className="hover:text-amber-400 transition-colors">
                  Phòng thi trắc nghiệm 25 phút
                </button>
              </li>
              <li>
                <button onClick={onOpenGlossary} className="hover:text-amber-400 transition-colors">
                  La bàn thuật ngữ (Ctrl + K)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h5 className="font-platypi text-white font-bold mb-3">Tài Liệu Tham Khảo</h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>Giáo trình Triết học Mác - Lênin (Bộ GD&ĐT)</li>
              <li>Tác phẩm kinh điển: Tư bản (Das Kapital)</li>
              <li>Biện chứng của tự nhiên (Ph.Ăngghen)</li>
              <li>Chủ nghĩa duy vật & CN kinh nghiệm phê phán (V.I.Lênin)</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
          <p>© 2026 Xplore MNL111. Thiết kế theo cảm hứng phong cách phiêu lưu tri thức.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Học sâu - Hiểu bản chất - Vượt qua kỳ thi</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
        </div>
      </div>
    </footer>
  );
}
