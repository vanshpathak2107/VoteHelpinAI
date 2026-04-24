'use client';

import { motion } from 'framer-motion';
import { Trophy, Brain, BookOpen, Map, TrendingUp, Star } from 'lucide-react';
import { useLocalStorage } from '@/lib/useLocalStorage';

export default function CivicScore() {
  const [quizScores] = useLocalStorage<number[]>('votesphere-quiz-scores', []);
  const avgScore = quizScores.length > 0 ? Math.round(quizScores.reduce((a, b) => a + b, 0) / quizScores.length) : 0;
  const civicScore = Math.min(100, avgScore + 20); // Base points for engagement

  const categories = [
    { label: 'Quiz Knowledge', value: avgScore, max: 100, color: '#8B5CF6', icon: Brain },
    { label: 'Journey Progress', value: 65, max: 100, color: '#3B82F6', icon: Map },
    { label: 'Glossary Explored', value: 40, max: 100, color: '#06B6D4', icon: BookOpen },
    { label: 'AI Engagement', value: 55, max: 100, color: '#F59E0B', icon: Star },
  ];

  const level = civicScore >= 80 ? 'Guardian' : civicScore >= 60 ? 'Champion' : civicScore >= 40 ? 'Advocate' : civicScore >= 20 ? 'Learner' : 'Beginner';

  return (
    <div className="space-y-8">
      {/* Main Score */}
      <div className="glass-card p-8 text-center">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-6">Your Civic Readiness Score</h2>
        <div className="relative w-48 h-48 mx-auto mb-6">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="65" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="12" />
            <motion.circle cx="80" cy="80" r="65" fill="none" strokeWidth="12" strokeLinecap="round"
              stroke="url(#scoreGradient)"
              strokeDasharray={408}
              initial={{ strokeDashoffset: 408 }}
              animate={{ strokeDashoffset: 408 - (408 * civicScore / 100) }}
              transition={{ duration: 2, ease: 'easeOut', delay: 0.3 }}
            />
            <defs>
              <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#8B5CF6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="text-5xl font-bold gradient-text-accent">{civicScore}</motion.span>
            <span className="text-sm text-slate-500 mt-1">/ 100</span>
          </div>
        </div>
        <div className="flex items-center justify-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-amber-400" />
          <span className="text-lg font-bold text-white">{level}</span>
        </div>
        <p className="text-sm text-slate-400">Keep learning to improve your civic readiness!</p>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {categories.map((cat, i) => (
          <motion.div key={cat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.1 }} className="glass-card p-5">
            <div className="flex items-center gap-2 mb-3">
              <cat.icon className="w-4 h-4" style={{ color: cat.color }} />
              <span className="text-sm font-medium text-white">{cat.label}</span>
              <span className="ml-auto text-sm font-bold" style={{ color: cat.color }}>{cat.value}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full" style={{ background: cat.color }}
                initial={{ width: 0 }} animate={{ width: `${cat.value}%` }}
                transition={{ duration: 1.5, delay: 0.5 + i * 0.1, ease: 'easeOut' }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Tips */}
      <div className="glass-card p-6">
        <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          Improve Your Score
        </h3>
        <ul className="space-y-3">
          {[
            'Complete all 8 steps of the Election Journey',
            'Score 80%+ on the Election Quiz',
            'Explore all glossary terms',
            'Ask 5+ questions to the AI assistant',
          ].map((tip, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
              <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center flex-shrink-0 mt-0.5 text-xs text-slate-500">{i + 1}</div>
              {tip}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
