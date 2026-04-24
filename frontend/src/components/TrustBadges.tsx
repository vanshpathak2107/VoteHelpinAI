'use client';

import { motion } from 'framer-motion';
import { Shield, GraduationCap, Bot, Fingerprint } from 'lucide-react';

const badges = [
  { icon: Shield, label: 'Secure', color: 'text-emerald-400' },
  { icon: GraduationCap, label: 'Educational', color: 'text-blue-400' },
  { icon: Bot, label: 'AI Powered', color: 'text-purple-400' },
  { icon: Fingerprint, label: 'Civic Ready', color: 'text-amber-400' },
];

export default function TrustBadges() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-5 sm:gap-8">
      {badges.map((badge, i) => (
        <motion.div
          key={badge.label}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1 + i * 0.15, type: 'spring' }}
          whileHover={{ y: -2, scale: 1.05 }}
          className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-sm cursor-default transition-all duration-300 hover:bg-white/[0.07] hover:border-white/[0.15]"
        >
          <badge.icon className={`w-4 h-4 ${badge.color}`} />
          <span className="text-xs font-medium text-slate-400">{badge.label}</span>
        </motion.div>
      ))}
    </div>
  );
}
