'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, AlertTriangle, CheckCircle } from 'lucide-react';
import { ELECTION_EVENTS } from '@/lib/constants';

function getTimeUntil(targetDate: string) {
  const now = new Date().getTime();
  const target = new Date(targetDate).getTime();
  const diff = target - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, passed: true };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
    passed: false,
  };
}

const ZERO_TIME = { days: 0, hours: 0, minutes: 0, seconds: 0, passed: false };

function CountdownUnit({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.12] backdrop-blur-sm flex items-center justify-center shadow-lg shadow-black/20">
        <motion.span
          key={value}
          initial={{ y: -8, opacity: 0, scale: 0.9 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="text-2xl sm:text-3xl font-bold gradient-text-accent tabular-nums"
        >
          {String(value).padStart(2, '0')}
        </motion.span>
      </div>
      <span className="text-[10px] text-slate-500 mt-2 uppercase tracking-[0.15em] font-semibold">{label}</span>
    </div>
  );
}

const typeColors: Record<string, string> = {
  deadline: 'text-red-400',
  event: 'text-blue-400',
  election: 'text-emerald-400',
  result: 'text-amber-400',
};

const typeIcons: Record<string, React.ElementType> = {
  deadline: AlertTriangle,
  event: Calendar,
  election: CheckCircle,
  result: CheckCircle,
};

export default function Countdown() {
  const nextEvent = ELECTION_EVENTS.find(e => new Date(e.date).getTime() > Date.now()) || ELECTION_EVENTS[0];
  // Initialize with zeros to prevent hydration mismatch, then update on client
  const [time, setTime] = useState(ZERO_TIME);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(getTimeUntil(nextEvent.date));
    const timer = setInterval(() => {
      setTime(getTimeUntil(nextEvent.date));
    }, 1000);
    return () => clearInterval(timer);
  }, [nextEvent.date]);

  const Icon = typeIcons[nextEvent.type] || Clock;

  if (!mounted) {
    return (
      <div className="glass-card p-6 sm:p-8 animate-pulse">
        <div className="h-20 bg-white/5 rounded-xl" />
      </div>
    );
  }

  return (
    <div className="glass-card-deep p-6 sm:p-8">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="text-center sm:text-left">
          <div className={`flex items-center gap-2 justify-center sm:justify-start ${typeColors[nextEvent.type]}`}>
            <Icon className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Upcoming</span>
          </div>
          <h3 className="text-xl font-bold text-white mt-2">{nextEvent.name}</h3>
          <p className="text-sm text-slate-400 mt-1">{nextEvent.description}</p>
        </div>
        <div className="flex gap-3 sm:gap-4">
          <CountdownUnit value={time.days} label="Days" />
          <div className="text-2xl font-bold text-slate-600 self-center mb-6 countdown-colon">:</div>
          <CountdownUnit value={time.hours} label="Hours" />
          <div className="text-2xl font-bold text-slate-600 self-center mb-6 countdown-colon">:</div>
          <CountdownUnit value={time.minutes} label="Min" />
          <div className="text-2xl font-bold text-slate-600 self-center mb-6 countdown-colon">:</div>
          <CountdownUnit value={time.seconds} label="Sec" />
        </div>
      </div>
      <div className="mt-6 pt-6 border-t border-white/5">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-[0.15em] mb-3">All Upcoming Events</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {ELECTION_EVENTS.map((event, i) => {
            const passed = new Date(event.date).getTime() < Date.now();
            const EIcon = typeIcons[event.type] || Calendar;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`flex items-start gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/5 transition-all duration-200 hover:bg-white/[0.06] hover:border-white/10 ${passed ? 'opacity-50' : ''}`}
              >
                <EIcon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${typeColors[event.type]}`} />
                <div>
                  <p className="text-sm font-medium text-white">{event.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    {passed && ' \u2022 Completed'}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
