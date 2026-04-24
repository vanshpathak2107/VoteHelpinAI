'use client';

import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import QuizSystem from '@/components/QuizSystem';

export default function QuizPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 mb-4">
            <Brain className="w-3.5 h-3.5" /> Test Yourself
          </div>
          <h1 className="section-heading gradient-text">Election Quiz</h1>
          <p className="section-subheading">Challenge your knowledge of the Indian election process</p>
        </motion.div>
        <QuizSystem />
      </div>
    </div>
  );
}
