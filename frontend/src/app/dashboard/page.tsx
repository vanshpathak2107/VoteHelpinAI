'use client';

import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';
import CivicScore from '@/components/CivicScore';

export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs text-amber-400 mb-4">
            <BarChart3 className="w-3.5 h-3.5" /> Your Progress
          </div>
          <h1 className="section-heading gradient-text">Civic Dashboard</h1>
          <p className="section-subheading">Track your election readiness and learning progress</p>
        </motion.div>
        <CivicScore />
      </div>
    </div>
  );
}
