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
          className="flex items-baseline gap-2 cursor-pointer select-none group"
        >
          <span className="font-platypi italic font-bold text-3xl tracking-tight text-amber-400 group-hover:opacity-70 transition-opacity drop-shadow-md">
            Dialectica.
          </span>
          <span className="text-[10px] tracking-widest text-amber-100/60 font-medium uppercase mt-1">
            MNL111
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-black/40 backdrop-blur-md p-1.5 rounded-full border border-amber-500/20 shadow-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id && !item.action;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs lg:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'text-amber-50/80 font-semibold hover:text-amber-400 hover:bg-white/5'
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
            className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-black/40 border border-amber-500/20 text-xs text-amber-50/80 font-semibold hover:border-amber-400/50 hover:text-amber-400 transition-all cursor-pointer backdrop-blur-sm shadow-sm"
            title="Bấm Ctrl + K để tra cứu nhanh"
          >
            <Search className="w-3.5 h-3.5 text-amber-500" />
            <span>Tra thuật ngữ</span>
            <kbd className="px-1.5 py-0.5 rounded bg-black/60 border border-amber-500/30 text-[10px] text-amber-200/70 font-mono">
              Ctrl K
            </kbd>
          </button>

          {/* Mastered Badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>{masteredCount}/{totalFlashcards} đã thuộc</span>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl bg-black/40 text-amber-50/80 hover:text-amber-400 border border-amber-500/20 backdrop-blur-sm"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-amber-500/20 bg-[#1a0505]/95 backdrop-blur-xl px-4 py-4 space-y-2">
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
                    : 'text-amber-50/80 hover:bg-white/5 hover:text-amber-400'
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
