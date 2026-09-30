import React from 'react';
import { Compass, BookOpen, Layers, Award, Search, Menu, X } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, onOpenGlossary, masteredCount, totalFlashcards }) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const navItems = [
    { id: 'overview', label: 'Hành Trình', icon: Compass },
    { id: 'flashcards', label: 'Flashcard 3D', icon: Layers },
    { id: 'quiz', label: 'Phòng Thi Quiz', icon: Award },
    { id: 'glossary', label: 'La Bàn Thuật Ngữ', icon: BookOpen, action: onOpenGlossary }
  ];

  const handleNavClick = (item) => {
    if (item.action) {
      item.action();
    } else {
      setActiveTab(item.id);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-transparent py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">

        {/* Brand Logo - Figma Style */}
        <div 
          onClick={() => setActiveTab('overview')}
          className="flex items-center gap-3 cursor-pointer select-none group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-slate-950" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-platypi text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors">
              xplore<span className="text-amber-400">.</span>
            </span>
            <span className="text-[10px] tracking-widest px-2 py-0.5 rounded-full bg-white/10 text-amber-300 font-semibold uppercase border border-white/10">
              MNL111
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1.5 rounded-full border border-white/[0.08]">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !item.action;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold shadow-md shadow-amber-500/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Quick Search */}
          <button
            onClick={onOpenGlossary}
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-white/[0.05] border border-white/10 text-xs text-slate-300 hover:border-amber-500/40 hover:text-amber-300 transition-all cursor-pointer"
            title="Bấm Ctrl + K để tra cứu nhanh"
          >
            <Search className="w-3.5 h-3.5 text-amber-400" />
            <span>Tra thuật ngữ</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-slate-400 font-mono">
              Ctrl K
            </kbd>
          </button>

          {/* Mastered Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{masteredCount}/{totalFlashcards} đã thuộc</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-white/[0.05] text-slate-300 hover:text-white border border-white/10"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#0c0f15] px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !item.action;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
