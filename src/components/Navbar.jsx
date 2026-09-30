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
    <nav className="glass-nav fixed top-0 left-0 right-0 z-50 px-4 lg:px-12 py-3.5 flex items-center justify-between">
      {/* Brand Logo */}
      <div 
        onClick={() => setActiveTab('overview')}
        className="flex items-center gap-3 cursor-pointer group"
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-black font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
          <Compass className="w-6 h-6 animate-spin-slow" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-platypi text-xl font-bold tracking-tight text-white">XPLORE</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              MNL111
            </span>
          </div>
          <p className="text-[11px] text-slate-400 font-medium hidden sm:block">Triết học Mác – Lênin</p>
        </div>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center gap-1.5 bg-slate-900/60 p-1.5 rounded-full border border-white/10">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id && !item.action;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-amber-500 text-black shadow-md shadow-amber-500/25 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </button>
          );
        })}
      </div>

      {/* Right Stats & Quick Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenGlossary}
          className="hidden lg:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 hover:border-amber-500/50 hover:text-amber-300 transition-colors"
          title="Bấm Ctrl + K để tìm kiếm"
        >
          <Search className="w-3.5 h-3.5 text-amber-400" />
          <span>Tra thuật ngữ</span>
          <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] text-slate-400 font-mono">
            Ctrl K
          </kbd>
        </button>

        {/* Mastered Progress Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-950/50 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>{masteredCount}/{totalFlashcards} Đã thuộc</span>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0c0f14] border-b border-white/10 p-4 space-y-2 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !item.action;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-amber-500 text-black font-semibold'
                    : 'text-slate-300 hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </nav>
  );
}
