'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle, XCircle, ArrowRight, RotateCcw, Share2, Trophy, Sparkles } from 'lucide-react';
import { QUIZ_QUESTIONS, getBadge, type QuizQuestion } from '@/lib/constants';
import { generateScoreShareText } from '@/lib/utils';

export default function QuizSystem() {
  const [started, setStarted] = useState(false);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<boolean[]>([]);

  const questions = useMemo(() => {
    const shuffled = [...QUIZ_QUESTIONS].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 10);
  }, [started]);

  const q = questions[currentQ];
  const percentage = finished ? Math.round((score / questions.length) * 100) : 0;
  const badge = getBadge(percentage);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    setAnswered(true);
    const correct = idx === q.correctAnswer;
    if (correct) setScore(s => s + 1);
    setAnswers(prev => [...prev, correct]);
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(c => c + 1);
      setSelected(null);
      setAnswered(false);
    } else {
      setFinished(true);
    }
  };

  const restart = () => {
    setStarted(false);
    setCurrentQ(0);
    setSelected(null);
    setAnswered(false);
    setScore(0);
    setFinished(false);
    setAnswers([]);
    setTimeout(() => setStarted(true), 100);
  };

  const shareResult = () => {
    const text = generateScoreShareText(score, questions.length, badge.name);
    if (navigator.share) {
      navigator.share({ title: 'VoteSphere AI Quiz Result', text });
    } else {
      navigator.clipboard.writeText(text);
    }
  };

  if (!started) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
        <div className="glass-card p-8 sm:p-12">
          <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-6xl mb-6">🗳️</motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold gradient-text mb-3">Are You Election Ready?</h2>
          <p className="text-slate-400 mb-2">Test your knowledge of the Indian election process</p>
          <p className="text-sm text-slate-500 mb-8">10 questions • Multiple choice • Instant results</p>
          <button onClick={() => setStarted(true)} className="gradient-button text-base flex items-center gap-2 mx-auto">
            <Brain className="w-5 h-5" />Start Quiz<ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    );
  }

  if (finished) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-2xl mx-auto">
        <div className="glass-card p-8 sm:p-12 text-center">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }} className="text-6xl mb-4">{badge.icon}</motion.div>
          <h2 className="text-2xl font-bold text-white mb-1">{badge.name}</h2>
          <p className="text-sm text-slate-400 mb-6">{badge.description}</p>

          {/* Score ring */}
          <div className="relative w-40 h-40 mx-auto mb-6">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
              <motion.circle
                cx="60" cy="60" r="50" fill="none" strokeWidth="10" strokeLinecap="round"
                stroke={badge.color}
                strokeDasharray={314}
                initial={{ strokeDashoffset: 314 }}
                animate={{ strokeDashoffset: 314 - (314 * percentage / 100) }}
                transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-3xl font-bold" style={{ color: badge.color }}>{percentage}%</motion.span>
              <span className="text-xs text-slate-500">{score}/{questions.length}</span>
            </div>
          </div>

          {/* Answer summary */}
          <div className="flex justify-center gap-1.5 mb-8">
            {answers.map((correct, i) => (
              <motion.div key={i} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.8 + i * 0.05 }}
                className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${correct ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                {correct ? '✓' : '✗'}
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-3">
            <button onClick={restart} className="glass-button flex items-center gap-2"><RotateCcw className="w-4 h-4" />Retry</button>
            <button onClick={shareResult} className="gradient-button flex items-center gap-2"><Share2 className="w-4 h-4" />Share Result</button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-slate-400">Question {currentQ + 1} of {questions.length}</span>
          <span className="text-sm font-medium px-2 py-0.5 rounded-full" style={{ background: `${q.difficulty === 'easy' ? '#10B981' : q.difficulty === 'medium' ? '#F59E0B' : '#EF4444'}20`, color: q.difficulty === 'easy' ? '#10B981' : q.difficulty === 'medium' ? '#F59E0B' : '#EF4444' }}>
            {q.difficulty}
          </span>
        </div>
        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
          <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" animate={{ width: `${((currentQ + 1) / questions.length) * 100}%` }} />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div key={currentQ} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
          <div className="glass-card p-6 sm:p-8">
            <div className="flex items-start gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-white leading-relaxed">{q.question}</h3>
            </div>

            <div className="space-y-3">
              {q.options.map((opt, i) => {
                const isSelected = selected === i;
                const isCorrect = i === q.correctAnswer;
                let bg = 'bg-white/5 border-white/10 hover:bg-white/10';
                if (answered) {
                  if (isCorrect) bg = 'bg-emerald-500/10 border-emerald-500/30';
                  else if (isSelected && !isCorrect) bg = 'bg-red-500/10 border-red-500/30';
                  else bg = 'bg-white/[0.02] border-white/5 opacity-50';
                }
                return (
                  <motion.button key={i} whileHover={!answered ? { scale: 1.01 } : {}} whileTap={!answered ? { scale: 0.99 } : {}}
                    onClick={() => handleSelect(i)}
                    className={`w-full flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${bg}`}
                    disabled={answered}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold flex-shrink-0 ${answered && isCorrect ? 'bg-emerald-500 text-white' : answered && isSelected ? 'bg-red-500 text-white' : 'bg-white/10 text-slate-400'}`}>
                      {answered && isCorrect ? <CheckCircle className="w-4 h-4" /> : answered && isSelected ? <XCircle className="w-4 h-4" /> : String.fromCharCode(65 + i)}
                    </div>
                    <span className="text-sm text-slate-200">{opt}</span>
                  </motion.button>
                );
              })}
            </div>

            {answered && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-5">
                <div className="p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
                  <p className="text-sm text-slate-300">{q.explanation}</p>
                </div>
                <button onClick={nextQuestion} className="mt-4 gradient-button text-sm flex items-center gap-2 ml-auto">
                  {currentQ < questions.length - 1 ? (<>Next Question<ArrowRight className="w-4 h-4" /></>) : (<>See Results<Trophy className="w-4 h-4" /></>)}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
