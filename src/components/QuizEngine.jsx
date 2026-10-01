import React, { useState, useEffect } from 'react';
import { 
  Award, Clock, CheckCircle2, XCircle, AlertCircle, 
  RotateCcw, ArrowRight, Flag, HelpCircle, BookOpen, 
  Sparkles, Check, ChevronRight, Zap
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function QuizEngine({ quizzes, chapters, initialChapterId = 'all' }) {
  const [selectedChapterId, setSelectedChapterId] = useState(initialChapterId);
  const [quizMode, setQuizMode] = useState('practice'); // 'practice' or 'exam'
  const [isStarted, setIsStarted] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  
  // Quiz state
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({}); // { [qId]: selectedOptionIndex }
  const [flaggedQuestions, setFlaggedQuestions] = useState({}); // { [qId]: true }
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  // Initialize or reset quiz
  const handleStartQuiz = (mode) => {
    let pool = quizzes;
    if (selectedChapterId !== 'all') {
      pool = quizzes.filter(q => q.chapterId === selectedChapterId);
    }
    // Shuffle questions
    const shuffled = [...pool].sort(() => Math.random() - 0.5);
    const questionsToUse = mode === 'exam' ? shuffled.slice(0, 20) : shuffled;

    setCurrentQuestions(questionsToUse);
    setQuizMode(mode);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setTimeLeft(mode === 'exam' ? 25 * 60 : 0);
    setIsStarted(true);
    setIsFinished(false);
  };

  // Timer effect for exam mode
  useEffect(() => {
    let timer;
    if (isStarted && !isFinished && quizMode === 'exam') {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isStarted, isFinished, quizMode]);

  const handleSelectOption = (qId, optionIdx) => {
    if (isFinished) return;
    setUserAnswers(prev => ({
      ...prev,
      [qId]: optionIdx
    }));
  };

  const handleToggleFlag = (qId) => {
    setFlaggedQuestions(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  const handleSubmitQuiz = () => {
    setIsFinished(true);
    // Calculate score for confetti
    let correctCount = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswerIndex) {
        correctCount++;
      }
    });
    const percentage = Math.round((correctCount / currentQuestions.length) * 100);
    if (percentage >= 70) {
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {
        // Confetti fallback
      }
    }
  };

  // Format seconds to mm:ss
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Retry only mistaken questions
  const handleRetakeMistakes = () => {
    const mistakes = currentQuestions.filter(q => userAnswers[q.id] !== q.correctAnswerIndex);
    if (mistakes.length === 0) return;
    setCurrentQuestions(mistakes);
    setCurrentIndex(0);
    setUserAnswers({});
    setFlaggedQuestions({});
    setIsFinished(false);
    setIsStarted(true);
    setQuizMode('practice');
  };

  const currentQ = currentQuestions[currentIndex];

  // START SCREEN
  if (!isStarted) {
    return (
      <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold mb-4 shadow-sm">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>Phòng Thi Trắc Nghiệm Chuẩn Hóa</span>
          </div>
          <h2 className="font-platypi text-3xl sm:text-4xl font-bold text-amber-50 mb-3">
            Thử Thách Vượt Ải <span className="gold-gradient-text italic">Triết Học</span>
          </h2>
          <p className="text-amber-100/80 text-sm max-w-lg mx-auto">
            Kiểm tra mức độ thấu hiểu các nguyên lý, quy luật và phạm trù triết học qua ngân hàng câu hỏi trắc nghiệm thực chiến.
          </p>
        </div>

        {/* Chapter Selection */}
        <div className="glass-panel p-6 mb-8 border border-amber-500/20 bg-black/30">
          <label className="block text-xs uppercase font-bold text-amber-100/60 tracking-wider mb-3">
            Chọn phạm vi ôn luyện:
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <button
              onClick={() => setSelectedChapterId('all')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                selectedChapterId === 'all'
                  ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                  : 'bg-black/30 border-amber-500/20 text-amber-100/70 hover:bg-black/80 hover:text-amber-400'
              }`}
            >
              <div className="text-xs uppercase opacity-80">Tổng hợp</div>
              <div className="text-sm font-semibold">Tất Cả 3 Chương ({quizzes.length} câu)</div>
            </button>
            {chapters.map(chap => {
              const count = quizzes.filter(q => q.chapterId === chap.id).length;
              return (
                <button
                  key={chap.id}
                  onClick={() => setSelectedChapterId(chap.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    selectedChapterId === chap.id
                      ? 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20'
                      : 'bg-black/30 border-amber-500/20 text-amber-100/70 hover:bg-black/80 hover:text-amber-400'
                  }`}
                >
                  <div className="text-xs uppercase opacity-80">{chap.number}</div>
                  <div className="text-sm font-semibold truncate">{chap.title} ({count} câu)</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Choose Mode Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass-panel p-6 gold-border-glow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-amber-50 mb-2">Chế Độ Luyện Tập</h3>
              <p className="text-xs text-amber-100/80 leading-relaxed mb-4">
                Không giới hạn thời gian. Hiển thị đáp án đúng và lời giải thích giáo trình chi tiết ngay sau mỗi câu chọn. Phù hợp để củng cố kiến thức.
              </p>
            </div>
            <button
              onClick={() => handleStartQuiz('practice')}
              className="btn-gold w-full justify-center py-3 text-sm font-semibold"
            >
              <Zap className="w-4 h-4" />
              <span>Bắt Đầu Luyện Tập</span>
            </button>
          </div>

          <div className="glass-panel p-6 gold-border-glow flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 mb-4">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-platypi text-xl font-bold text-amber-50 mb-2">Chế Độ Thi Thử Áp Lực</h3>
              <p className="text-xs text-amber-100/80 leading-relaxed mb-4">
                Mô phỏng kỳ thi trắc nghiệm đại học. Đếm ngược 25 phút, đánh dấu câu hỏi cần xem lại, chỉ công bố điểm số và đáp án sau khi nộp bài.
              </p>
            </div>
            <button
              onClick={() => handleStartQuiz('exam')}
              className="btn-ghost w-full justify-center py-3 text-sm font-semibold hover:border-amber-500"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Vào Phòng Thi Thử (25p)</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULTS SCREEN
  if (isFinished) {
    let correctCount = 0;
    currentQuestions.forEach(q => {
      if (userAnswers[q.id] === q.correctAnswerIndex) correctCount++;
    });
    const score = ((correctCount / currentQuestions.length) * 10).toFixed(1);
    const percentage = Math.round((correctCount / currentQuestions.length) * 100);

    return (
      <div className="py-10 max-w-4xl mx-auto px-4 sm:px-6">
        {/* Score Summary Box */}
        <div className="glass-panel p-8 text-center border border-amber-500/30 mb-8 bg-gradient-to-b from-[#271010] to-[#170909]">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-black font-extrabold text-3xl font-platypi shadow-xl shadow-amber-500/30 mb-4 animate-bounce">
            {score}
          </div>
          <h2 className="font-platypi text-2xl sm:text-3xl font-bold text-amber-50 mb-2">
            {percentage >= 80 ? 'Xuất Sắc! Bạn Đã Làm Chủ Kiến Thức 🎉' : percentage >= 50 ? 'Khá Tốt! Cố Gắng Ôn Kỹ Thêm Nhé 👏' : 'Cần Nỗ Lực Ôn Lại Flashcard Thêm 📚'}
          </h2>
          <p className="text-amber-100/80 text-sm mb-6">
            Bạn đã trả lời đúng <strong className="text-emerald-400">{correctCount}</strong> / {currentQuestions.length} câu hỏi ({percentage}%).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => handleStartQuiz(quizMode)}
              className="btn-gold py-2.5 px-6 text-xs font-semibold"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Làm Lại Đề Này</span>
            </button>

            {correctCount < currentQuestions.length && (
              <button
                onClick={handleRetakeMistakes}
                className="btn-ghost py-2.5 px-6 text-xs font-semibold border-rose-500/40 text-rose-300 hover:bg-rose-500/10"
              >
                <XCircle className="w-4 h-4 text-rose-400" />
                <span>Làm Lại {currentQuestions.length - correctCount} Câu Sai</span>
              </button>
            )}

            <button
              onClick={() => setIsStarted(false)}
              className="btn-ghost py-2.5 px-6 text-xs font-semibold"
            >
              <span>Về Menu Chọn Đề</span>
            </button>
          </div>
        </div>

        {/* Detailed Question Review List */}
        <h3 className="font-platypi text-xl font-bold text-amber-300 mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-400" />
          <span>Chi Tiết Từng Câu Hỏi & Lời Giải Thích:</span>
        </h3>

        <div className="space-y-6">
          {currentQuestions.map((q, idx) => {
            const userAns = userAnswers[q.id];
            const isCorrect = userAns === q.correctAnswerIndex;
            const isAnswered = userAns !== undefined;

            return (
              <div 
                key={q.id}
                className={`glass-panel p-6 border transition-all ${
                  isCorrect 
                    ? 'border-emerald-500/30 bg-emerald-950/20' 
                    : 'border-rose-500/30 bg-rose-950/20'
                }`}
              >
                <div className="flex items-start justify-between gap-4 mb-3">
                  <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-black/30 border border-amber-500/20 text-amber-100/70">
                    Câu {idx + 1}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    {isCorrect ? (
                      <span className="text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" /> Đúng
                      </span>
                    ) : (
                      <span className="text-rose-400 flex items-center gap-1">
                        <XCircle className="w-4 h-4" /> {isAnswered ? 'Sai' : 'Chưa làm'}
                      </span>
                    )}
                  </div>
                </div>

                <h4 className="font-semibold text-amber-50 text-base mb-4">{q.question}</h4>

                <div className="space-y-2 mb-4">
                  {q.options.map((opt, oIdx) => {
                    const isSelected = userAns === oIdx;
                    const isTheRightAnswer = oIdx === q.correctAnswerIndex;

                    let optionStyle = 'bg-black/30 border-amber-500/20 text-amber-100/80';
                    if (isTheRightAnswer) {
                      optionStyle = 'bg-emerald-500/20 border-emerald-500/50 text-emerald-200 font-semibold';
                    } else if (isSelected && !isTheRightAnswer) {
                      optionStyle = 'bg-rose-500/20 border-rose-500/50 text-rose-200 line-through';
                    }

                    return (
                      <div
                        key={oIdx}
                        className={`p-3 rounded-xl border text-xs sm:text-sm flex items-center justify-between ${optionStyle}`}
                      >
                        <span>{opt}</span>
                        {isTheRightAnswer && <Check className="w-4 h-4 text-emerald-600 shrink-0" />}
                        {isSelected && !isTheRightAnswer && <XCircle className="w-4 h-4 text-rose-400 shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* Explanation block */}
                <div className="p-3.5 rounded-xl bg-black/30 border border-amber-500/30 text-xs text-amber-100/80 space-y-1">
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Giải thích chuẩn giáo trình:</span>
                  </div>
                  <p>{q.explanation}</p>
                  {q.reference && (
                    <div className="text-[11px] text-amber-100/50 italic mt-1">
                      Nguồn: {q.reference}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ACTIVE IN-PROGRESS QUIZ SCREEN
  const userAns = userAnswers[currentQ?.id];
  const isAnswered = userAns !== undefined;
  const isFlagged = flaggedQuestions[currentQ?.id];

  return (
    <div className="py-6 max-w-5xl mx-auto px-4 sm:px-6">
      {/* Top Bar: Timer, Progress & Quick Submit */}
      <div className="glass-panel p-4 mb-6 flex flex-wrap items-center justify-between gap-4 border border-amber-500/20 bg-[#271010]/60">
        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-amber-100/70">
            Câu <strong>{currentIndex + 1}</strong> / {currentQuestions.length}
          </span>
          <button
            onClick={() => handleToggleFlag(currentQ?.id)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors border ${
              isFlagged 
                ? 'bg-amber-500 text-black border-amber-500' 
                : 'bg-black/30 text-amber-100/70 hover:text-amber-400 border-transparent'
            }`}
          >
            <Flag className="w-3.5 h-3.5" />
            <span>{isFlagged ? 'Đã đánh dấu' : 'Đánh dấu xem lại'}</span>
          </button>
        </div>

        {/* Timer if exam mode */}
        {quizMode === 'exam' && (
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 font-mono text-sm font-bold animate-pulse">
            <Clock className="w-4 h-4" />
            <span>{formatTime(timeLeft)}</span>
          </div>
        )}

        <button
          onClick={handleSubmitQuiz}
          className="btn-gold py-1.5 px-4 text-xs font-semibold"
        >
          <span>Nộp Bài Thi</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Question Box */}
        <div className="lg:col-span-3 space-y-6">
          <div className="glass-panel p-6 sm:p-8 border border-amber-500/20 bg-gradient-to-br from-[#271010] via-[#1f0d0d] to-[#170909]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-500/15 border border-amber-600/30 text-amber-500">
                Câu {currentIndex + 1}
              </span>
              <span className="text-xs text-amber-100/60 capitalize">
                Độ khó: {currentQ?.difficulty || 'Trung bình'}
              </span>
            </div>

            <h3 className="font-platypi text-xl sm:text-2xl font-bold text-amber-50 mb-6 leading-snug">
              {currentQ?.question}
            </h3>

            {/* Options list */}
            <div className="space-y-3">
              {currentQ?.options.map((optionText, oIdx) => {
                const isSelected = userAns === oIdx;
                const isPractice = quizMode === 'practice';
                const isCorrect = oIdx === currentQ.correctAnswerIndex;

                let btnStyle = 'bg-black/30 hover:bg-black/30 border-amber-500/20 text-amber-100/80 hover:text-amber-50';
                if (isSelected) {
                  btnStyle = 'bg-amber-500 text-black border-amber-400 font-bold shadow-lg shadow-amber-500/20';
                }

                // In practice mode, show correct/incorrect if answered
                if (isPractice && isAnswered) {
                  if (isCorrect) {
                    btnStyle = 'bg-emerald-500/20 border-emerald-500 text-emerald-400 font-semibold';
                  } else if (isSelected && !isCorrect) {
                    btnStyle = 'bg-rose-500/20 border-rose-500 text-rose-300';
                  }
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelectOption(currentQ.id, oIdx)}
                    className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base flex items-center justify-between transition-all ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-lg bg-black/30 border border-amber-500/30 flex items-center justify-center text-xs font-bold shrink-0">
                        {String.fromCharCode(65 + oIdx)}
                      </span>
                      <span>{optionText}</span>
                    </div>
                    {isPractice && isAnswered && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Practice mode instant explanation */}
            {quizMode === 'practice' && isAnswered && (
              <div className="mt-6 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-xs sm:text-sm text-amber-100/80">
                <div className="font-bold text-amber-500 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>Giải thích chi tiết:</span>
                </div>
                <p className="text-amber-100/90 leading-relaxed">{currentQ.explanation}</p>
                {currentQ.reference && (
                  <p className="text-[11px] text-amber-100/60 italic mt-2">Nguồn: {currentQ.reference}</p>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className="btn-ghost text-xs py-2.5 px-5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Câu Trước
            </button>

            {currentIndex < currentQuestions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => prev + 1)}
                className="btn-gold text-xs py-2.5 px-6"
              >
                <span>Câu Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmitQuiz}
                className="btn-gold text-xs py-2.5 px-6 shadow-xl shadow-amber-500/25"
              >
                <span>Nộp Bài Tổng Kết</span>
                <Check className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Sidebar Question Matrix Grid */}
        <div className="glass-panel p-5 border border-amber-500/20 bg-black/30 h-fit">
          <h4 className="font-platypi text-sm font-bold text-amber-400 mb-3 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-500" />
            <span>Bảng {currentQuestions.length} Câu Hỏi:</span>
          </h4>

          <div className="grid grid-cols-5 gap-2 mb-4">
            {currentQuestions.map((q, idx) => {
              const ans = userAnswers[q.id];
              const isCurrent = currentIndex === idx;
              const hasFlag = flaggedQuestions[q.id];

              let cellStyle = 'bg-black/30 border-amber-500/20 text-amber-100/70 hover:text-amber-400 hover:bg-black/80';
              if (ans !== undefined) {
                cellStyle = 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 font-semibold';
              }
              if (hasFlag) {
                cellStyle = 'bg-amber-500/30 border-amber-500 text-amber-400 font-bold';
              }
              if (isCurrent) {
                cellStyle += ' ring-2 ring-amber-400';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-9 rounded-xl border text-xs font-mono flex items-center justify-center transition-all ${cellStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          <div className="space-y-1.5 text-[11px] text-amber-100/60 border-t border-amber-500/20 pt-3">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500/30 border border-emerald-500/50"></span>
              <span>Đã làm ({Object.keys(userAnswers).length})</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-amber-500/30 border border-amber-500/50"></span>
              <span>Đánh dấu xem lại ({Object.values(flaggedQuestions).filter(Boolean).length})</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
