import React, { useState, useEffect, useCallback } from 'react';
import { 
  RotateCw, ChevronLeft, ChevronRight, CheckCircle2, 
  XCircle, Volume2, Shuffle, Play, Pause, Sparkles, 
  BookOpen, Lightbulb, List, Layers, HelpCircle
} from 'lucide-react';

export default function FlashcardViewer({ 
  flashcards, 
  chapters, 
  selectedChapterId, 
  onChapterChange, 
  masteredIds, 
  onToggleMastered 
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('card'); // 'card' or 'list'
  const [cards, setCards] = useState(flashcards);
  const [speaking, setSpeaking] = useState(false);

  // Filter cards based on selected chapter
  useEffect(() => {
    let filtered = flashcards;
    if (selectedChapterId !== 'all') {
      filtered = flashcards.filter(c => c.chapterId === selectedChapterId);
    }
    setCards(filtered);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsAutoPlaying(false);
  }, [selectedChapterId, flashcards]);

  const currentCard = cards[currentIndex] || cards[0];
  const isCurrentMastered = currentCard ? masteredIds.includes(currentCard.id) : false;

  // Next & Prev handlers
  const handleNext = useCallback(() => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  }, [cards.length]);

  const handlePrev = useCallback(() => {
    if (cards.length === 0) return;
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
  }, [cards.length]);

  // Shuffle handler
  const handleShuffle = () => {
    const shuffled = [...cards].sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Text-to-Speech handler
  const handleSpeak = (text) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (speaking) {
      setSpeaking(false);
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.95;
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => setSpeaking(false);
    setSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (viewMode !== 'card') return;
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped(f => !f);
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.key === '1' && currentCard) {
        if (isCurrentMastered) onToggleMastered(currentCard.id);
      } else if (e.key === '2' && currentCard) {
        if (!isCurrentMastered) onToggleMastered(currentCard.id);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [viewMode, handleNext, handlePrev, currentCard, isCurrentMastered, onToggleMastered]);

  // Auto play effect
  useEffect(() => {
    let interval;
    if (isAutoPlaying && cards.length > 0) {
      interval = setInterval(() => {
        setIsFlipped(prev => {
          if (!prev) {
            return true; // Flip to back
          } else {
            handleNext(); // Move next
            return false;
          }
        });
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, cards.length, handleNext]);

  if (!currentCard) {
    return (
      <div className="py-24 text-center text-amber-100/70">
        <p>Không tìm thấy flashcard nào trong mục này.</p>
      </div>
    );
  }

  const currentChapter = chapters.find(c => c.id === currentCard.chapterId);

  return (
    <div className="py-8 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Chapter Selection Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 bg-black/30 p-1.5 rounded-2xl border border-amber-500/20">
          <button
            onClick={() => onChapterChange('all')}
            className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
              selectedChapterId === 'all'
                ? 'bg-amber-500 text-black font-bold shadow-md'
                : 'text-amber-100/70 font-semibold hover:text-amber-400 hover:bg-black/30'
            }`}
          >
            Tất Cả ({flashcards.length})
          </button>
          {chapters.map(chap => {
            const count = flashcards.filter(f => f.chapterId === chap.id).length;
            return (
              <button
                key={chap.id}
                onClick={() => onChapterChange(chap.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs transition-all ${
                  selectedChapterId === chap.id
                    ? 'bg-amber-500 text-black font-bold shadow-md'
                    : 'text-amber-100/70 font-semibold hover:text-amber-400 hover:bg-black/30'
                }`}
              >
                {chap.number} ({count})
              </button>
            );
          })}
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center gap-2 bg-black/30 p-1.5 rounded-xl border border-amber-500/20">
          <button
            onClick={() => setViewMode('card')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all font-semibold ${
              viewMode === 'card' ? 'bg-amber-500 shadow-sm text-black' : 'text-amber-100/70 hover:text-amber-400 hover:bg-black/30'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span className="hidden sm:inline">Thẻ 3D</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1.5 transition-all font-semibold ${
              viewMode === 'list' ? 'bg-amber-500 shadow-sm text-black' : 'text-amber-100/70 hover:text-amber-400 hover:bg-black/30'
            }`}
          >
            <List className="w-4 h-4" />
            <span className="hidden sm:inline">Danh Sách</span>
          </button>
        </div>
      </div>

      {viewMode === 'card' ? (
        <div>
          {/* Progress & Deck Controls */}
          <div className="flex items-center justify-between text-xs text-amber-100/70 mb-3 px-2">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-400">Thẻ {currentIndex + 1}</span>
              <span>/ {cards.length}</span>
              {currentChapter && (
                <span className="hidden sm:inline px-2 py-0.5 rounded bg-black/30 border border-amber-500/30 text-amber-400">
                  {currentChapter.number}
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-black/30 hover:bg-black/30 text-amber-100/70 hover:text-amber-400 transition-colors border border-transparent"
                title="Trộn ngẫu nhiên thẻ"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Trộn</span>
              </button>

              <button
                onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors border ${
                  isAutoPlaying 
                    ? 'bg-amber-500 text-black font-semibold border-amber-500' 
                    : 'bg-black/30 hover:bg-black/30 text-amber-100/70 hover:text-amber-400 border-transparent'
                }`}
                title="Tự động lật và chuyển thẻ"
              >
                {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{isAutoPlaying ? 'Dừng' : 'Tự chạy'}</span>
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-800/80 h-1.5 rounded-full overflow-hidden mb-6">
            <div 
              className="bg-gradient-to-r from-amber-500 to-amber-300 h-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / cards.length) * 100}%` }}
            ></div>
          </div>

          {/* 3D Flashcard Container */}
          <div className="perspective-1000 w-full min-h-[380px] sm:min-h-[420px] mb-6">
            <div 
              onClick={() => setIsFlipped(!isFlipped)}
              className={`relative w-full h-full min-h-[380px] sm:min-h-[420px] rounded-3xl transition-transform duration-500 preserve-3d cursor-pointer ${
                isFlipped ? 'rotate-y-180' : ''
              }`}
            >
              {/* FRONT OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden glass-panel p-8 sm:p-12 flex flex-col justify-between border border-amber-500/20 bg-gradient-to-br from-[#380a0a] via-[#2b0707] to-[#1f0404] shadow-2xl">
                {/* Header info */}
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full bg-black/30 border border-amber-500/30 text-amber-400 text-xs font-semibold">
                    {currentCard.category}
                  </span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(currentCard.term);
                      }}
                      className="p-2 rounded-full bg-black/30 hover:bg-amber-500/20 text-amber-100/70 hover:text-amber-400 transition-colors"
                      title="Đọc thuật ngữ"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleMastered(currentCard.id);
                      }}
                      className={`p-2 rounded-full transition-colors ${
                        isCurrentMastered 
                          ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/30' 
                          : 'bg-black/30 text-amber-100/70 hover:text-emerald-400 border border-transparent'
                      }`}
                      title={isCurrentMastered ? 'Đã thuộc thẻ này' : 'Đánh dấu đã thuộc'}
                    >
                      <CheckCircle2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Main Term Question */}
                <div className="my-auto text-center py-6">
                  <p className="text-xs uppercase tracking-widest text-amber-100/60 font-semibold mb-3">
                    Thuật ngữ / Câu hỏi cốt lõi
                  </p>
                  <h3 className="font-platypi text-2xl sm:text-3xl md:text-4xl font-bold text-amber-50 leading-snug">
                    {currentCard.term}
                  </h3>
                </div>

                {/* Flip Hint */}
                <div className="flex items-center justify-center gap-2 text-xs text-amber-100/50">
                  <RotateCw className="w-3.5 h-3.5 animate-spin-slow text-amber-400" />
                  <span>Click hoặc phím <strong>Space</strong> để xem định nghĩa & mẹo nhớ</span>
                </div>
              </div>

              {/* BACK OF CARD */}
              <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 glass-panel p-6 sm:p-10 flex flex-col justify-between border border-amber-500/30 bg-gradient-to-br from-[#380a0a] via-[#2b0707] to-[#1f0404] shadow-2xl overflow-y-auto">
                <div>
                  {/* Top category & speak */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Định nghĩa & Bản Bản chất
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSpeak(`${currentCard.term}. ${currentCard.definition}`);
                      }}
                      className="p-2 rounded-full bg-black/30 hover:bg-amber-500/20 text-amber-100/70 hover:text-amber-400 transition-colors"
                      title="Đọc toàn bộ định nghĩa"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Definition text */}
                  <div className="mb-5 p-4 rounded-xl bg-black/30 border border-amber-500/30">
                    <p className="text-sm sm:text-base text-amber-50 leading-relaxed">
                      {currentCard.definition}
                    </p>
                  </div>

                  {/* Key Takeaways */}
                  {currentCard.keyTakeaways && (
                    <div className="mb-4">
                      <p className="text-xs font-bold text-amber-100/60 uppercase tracking-wider mb-2 flex items-center gap-1">
                        <BookOpen className="w-3 h-3 text-cyan-400" />
                        Ý chính cần ghi nhớ:
                      </p>
                      <ul className="space-y-1.5 text-xs sm:text-sm text-amber-100/90">
                        {currentCard.keyTakeaways.map((point, pIdx) => (
                          <li key={pIdx} className="flex items-start gap-2">
                            <span className="text-emerald-400 mt-1">✔</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Mnemonic Tip */}
                  {currentCard.mnemonicTip && (
                    <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 flex items-start gap-2">
                      <Lightbulb className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                      <div>
                        <strong>Mẹo nhớ nhanh: </strong>
                        <span>{currentCard.mnemonicTip}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="pt-4 flex items-center justify-between text-xs text-amber-100/50 border-t border-amber-500/20 mt-3">
                  <span>Nhấn Space để lật lại mặt trước</span>
                  <span className="text-amber-400 font-semibold">{currentCard.term}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation & Status Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Status rating buttons (Quizlet style) */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  if (isCurrentMastered) onToggleMastered(currentCard.id);
                  handleNext();
                }}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-red-950/40 hover:bg-red-900/40 border border-rose-500/30 text-rose-400 text-xs font-bold transition-colors"
                title="Phím tắt: 1"
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Cần ôn lại (Phím 1)</span>
              </button>

              <button
                onClick={() => {
                  if (!isCurrentMastered) onToggleMastered(currentCard.id);
                  handleNext();
                }}
                className={`flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-xs font-bold transition-colors ${
                  isCurrentMastered
                    ? 'bg-emerald-500 text-black border-emerald-400 shadow-md shadow-emerald-500/20'
                    : 'bg-emerald-950/40 hover:bg-emerald-900/40 border-emerald-500/30 text-emerald-400'
                }`}
                title="Phím tắt: 2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCurrentMastered ? 'Đã thuộc ✔' : 'Đã nhớ (Phím 2)'}</span>
              </button>
            </div>

            {/* Prev / Next controls */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-3 rounded-2xl bg-black/30 hover:bg-black/80 border border-amber-500/30 text-amber-400 transition-all hover:scale-105 active:scale-95"
                title="Phím tắt: ←"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={() => setIsFlipped(!isFlipped)}
                className="btn-gold py-2.5 px-6 text-xs font-semibold"
              >
                <RotateCw className="w-4 h-4" />
                <span>Lật Thẻ</span>
              </button>

              <button
                onClick={handleNext}
                className="p-3 rounded-2xl bg-black/30 hover:bg-black/80 border border-amber-500/30 text-amber-400 transition-all hover:scale-105 active:scale-95"
                title="Phím tắt: →"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* LIST VIEW MODE */
        <div className="space-y-4">
          {cards.map((card, idx) => {
            const isMastered = masteredIds.includes(card.id);
            return (
              <div 
                key={card.id}
                className={`glass-panel p-5 border transition-all bg-black/30 ${
                  isMastered ? 'border-emerald-500/30 bg-emerald-950/20' : 'border-amber-500/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-amber-100/50">#{idx + 1}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 text-[11px] font-semibold border border-amber-500/20">
                      {card.category}
                    </span>
                  </div>
                  <button
                    onClick={() => onToggleMastered(card.id)}
                    className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
                      isMastered 
                        ? 'bg-emerald-950/40 text-emerald-400 border border-emerald-500/40' 
                        : 'bg-black/30 text-amber-100/70 hover:text-amber-400 border border-transparent'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{isMastered ? 'Đã thuộc' : 'Chưa thuộc'}</span>
                  </button>
                </div>

                <h4 className="font-platypi text-lg font-bold text-amber-50 mb-2">{card.term}</h4>
                <p className="text-sm text-amber-100/80 mb-3">{card.definition}</p>
                
                {card.mnemonicTip && (
                  <div className="text-xs text-amber-400 bg-amber-500/10 p-2.5 rounded-lg border border-amber-500/20 flex items-center gap-2">
                    <Lightbulb className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span>{card.mnemonicTip}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
