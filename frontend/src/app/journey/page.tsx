'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Map } from 'lucide-react';
import JourneyTimeline from '@/components/JourneyTimeline';
import LearningModeToggle from '@/components/LearningModeToggle';
import { type LearningMode } from '@/lib/constants';

export default function JourneyPage() {
  const [mode, setMode] = useState<LearningMode>('beginner');

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs text-blue-400 mb-4">
            <Map className="w-3.5 h-3.5" /> Interactive Journey
          </div>
          <h1 className="section-heading gradient-text">The Election Journey</h1>
          <p className="section-subheading">Follow the complete path from voter registration to result declaration</p>
          <LearningModeToggle mode={mode} onChange={setMode} />
        </motion.div>

        <JourneyTimeline />
      </div>
    </div>
  );
}
