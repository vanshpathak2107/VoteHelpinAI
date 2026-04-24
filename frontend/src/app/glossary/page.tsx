'use client';

import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';
import GlossarySearch from '@/components/GlossarySearch';

export default function GlossaryPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-400 mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Election Terms
          </div>
          <h1 className="section-heading gradient-text">Smart Glossary</h1>
          <p className="section-subheading">Search and explore election terminology instantly</p>
        </motion.div>
        <GlossarySearch />
      </div>
    </div>
  );
}
