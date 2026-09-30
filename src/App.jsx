import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ChapterCards from './components/ChapterCards';
import FlashcardViewer from './components/FlashcardViewer';
import QuizEngine from './components/QuizEngine';
import GlossaryModal from './components/GlossaryModal';
import Footer from './components/Footer';

// Datasets
import chaptersData from './data/chapters.json';
import flashcardsData from './data/flashcards.json';
import quizzesData from './data/quizzes.json';
import glossaryData from './data/glossary.json';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'flashcards' | 'quiz'
  const [selectedChapterId, setSelectedChapterId] = useState('all');
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  // Load mastered flashcards from LocalStorage
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('mnl111_mastered_cards');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  // Save mastered IDs to LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem('mnl111_mastered_cards', JSON.stringify(masteredIds));
    } catch (e) {
      console.error(e);
    }
  }, [masteredIds]);

  // Global shortcut Ctrl+K to open glossary
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsGlossaryOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleToggleMastered = (cardId) => {
    setMasteredIds(prev => {
      if (prev.includes(cardId)) {
        return prev.filter(id => id !== cardId);
      } else {
        return [...prev, cardId];
      }
    });
  };

  // Count mastered flashcards per chapter
  const masteredByChapter = {};
  chaptersData.forEach(chap => {
    const chapCards = flashcardsData.filter(f => f.chapterId === chap.id);
    const count = chapCards.filter(f => masteredIds.includes(f.id)).length;
    masteredByChapter[chap.id] = count;
  });

  const handleStartFlashcardsForChapter = (chapId) => {
    setSelectedChapterId(chapId);
    setActiveTab('flashcards');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleStartQuizForChapter = (chapId) => {
    setSelectedChapterId(chapId);
    setActiveTab('quiz');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-ui selection:bg-amber-500 selection:text-black">
      {/* Top Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        masteredCount={masteredIds.length}
        totalFlashcards={flashcardsData.length}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <>
            <HeroSection
              onStartFlashcards={() => {
                setSelectedChapterId('all');
                setActiveTab('flashcards');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              onStartQuiz={() => {
                setSelectedChapterId('all');
                setActiveTab('quiz');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              totalFlashcards={flashcardsData.length}
              totalQuestions={quizzesData.length}
            />

            <ChapterCards
              chapters={chaptersData}
              masteredByChapter={masteredByChapter}
              onSelectChapterForFlashcards={handleStartFlashcardsForChapter}
              onSelectChapterForQuiz={handleStartQuizForChapter}
            />
          </>
        )}

        {activeTab === 'flashcards' && (
          <div className="pt-24 pb-12">
            <div className="max-w-5xl mx-auto px-4 sm:px-6 mb-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-platypi text-2xl sm:text-3xl font-bold text-slate-900">
                    Flashcard <span className="gold-gradient-text italic">Ghi Nhớ 3D</span>
                  </h2>
                  <p className="text-xs text-slate-600 mt-1">
                    Lật thẻ, nghe phát âm và phân loại "Đã nhớ / Cần ôn lại" theo phương pháp Spaced Repetition.
                  </p>
                </div>
              </div>
            </div>

            <FlashcardViewer
              flashcards={flashcardsData}
              chapters={chaptersData}
              selectedChapterId={selectedChapterId}
              onChapterChange={setSelectedChapterId}
              masteredIds={masteredIds}
              onToggleMastered={handleToggleMastered}
            />
          </div>
        )}

        {activeTab === 'quiz' && (
          <div className="pt-24 pb-12">
            <QuizEngine
              quizzes={quizzesData}
              chapters={chaptersData}
              initialChapterId={selectedChapterId}
            />
          </div>
        )}
      </main>

      {/* Quick Search Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
        glossary={glossaryData}
      />

      {/* Footer */}
      <Footer
        onOpenGlossary={() => setIsGlossaryOpen(true)}
        onNavigate={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    </div>
  );
}
