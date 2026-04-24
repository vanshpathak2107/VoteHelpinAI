'use client';

import { motion } from 'framer-motion';
import { LEARNING_MODES, type LearningMode } from '@/lib/constants';

export default function LearningModeToggle({ mode, onChange }: { mode: LearningMode; onChange: (m: LearningMode) => void }) {
  return (
    <div className="glass-card p-2 inline-flex gap-1">
      {LEARNING_MODES.map((m) => (
        <button
          key={m.id}
          onClick={() => onChange(m.id)}
          className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-colors ${mode === m.id ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}
        >
          {mode === m.id && (
            <motion.div
              layoutId="learning-mode-bg"
              className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative flex items-center gap-1.5">
            <span>{m.icon}</span>
            <span>{m.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}
