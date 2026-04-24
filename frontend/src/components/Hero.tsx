'use client';

import { motion } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Vote,
  Brain,
  Map,
  Sparkles,
  ArrowRight,
  Bot,
  ChevronDown,
  Star,
} from 'lucide-react';
import Countdown from './Countdown';
import TrustBadges from './TrustBadges';

/* ── Particle System ─────────────────────── */
function ParticleField() {
  const particles = useMemo(() =>
    Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: (i * 4.17) % 100,
      delay: (i * 0.32) % 8,
      duration: 6 + (i * 0.35) % 8,
      size: 3 + (i * 0.25) % 6,
      opacity: 0.15 + (i * 0.01) % 0.25,
      color: i % 2 === 0 ? '59,130,246' : '139,92,246',
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            width: p.size,
            height: p.size,
            background: `rgba(${p.color}, ${p.opacity})`,
          }}
          animate={{
            y: ['100vh', '-5vh'],
            opacity: [0, p.opacity, p.opacity, 0],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

/* ── Animated Floating Ballot Box ────────── */
function FloatingBallot() {
  return (
    <motion.div
      className="relative w-48 h-48 md:w-64 md:h-64"
      animate={{ y: [0, -15, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
    >
      {/* Glow behind the box */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 rounded-3xl blur-3xl animate-pulse-soft" />

      {/* The ballot box */}
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Box body */}
        <div className="relative">
          <motion.div
            className="w-36 h-32 md:w-44 md:h-40 rounded-2xl bg-gradient-to-br from-indigo-600/80 to-purple-700/80 border border-white/20 backdrop-blur-sm shadow-2xl flex flex-col items-center justify-center"
            animate={{ rotateY: [0, 5, -5, 0], rotateZ: [0, 1, -1, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* Slot */}
            <div className="w-20 md:w-24 h-2 bg-white/30 rounded-full mb-3 shadow-inner" />
            {/* Vote symbol */}
            <Vote className="w-12 h-12 md:w-16 md:h-16 text-white/80" />
            <span className="text-white/60 text-xs mt-2 font-medium tracking-wider">VOTE</span>
          </motion.div>

          {/* Floating ballot papers */}
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute w-8 h-10 bg-white/90 rounded-sm shadow-lg"
              style={{ top: -20 - i * 10, left: 30 + i * 25 }}
              animate={{
                y: [-30, 10, -30],
                rotate: [-10 + i * 10, 15 - i * 5, -10 + i * 10],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3 + i * 0.5,
                delay: i * 0.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            >
              <div className="w-full h-full p-1.5 flex flex-col gap-1">
                <div className="w-full h-0.5 bg-indigo-300/50 rounded" />
                <div className="w-3/4 h-0.5 bg-indigo-300/50 rounded" />
                <div className="w-1/2 h-0.5 bg-indigo-300/50 rounded" />
                <div className="w-2 h-2 rounded-full border border-indigo-400 mt-auto self-center" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Orbiting stars */}
      {[0, 1, 2, 3].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: '50%',
            left: '50%',
          }}
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 8 + i * 2,
            delay: i * 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          <Star
            className="text-yellow-400/40"
            style={{
              transform: `translateX(${80 + i * 15}px) translateY(-50%)`,
              width: 8 + i * 2,
              height: 8 + i * 2,
            }}
            fill="currentColor"
          />
        </motion.div>
      ))}
    </motion.div>
  );
}

/* ── Hero Section ────────────────────────── */
export default function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen bg-[#0F172A]" />;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/15 rounded-full blur-[120px] animate-pulse-soft" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/15 rounded-full blur-[120px] animate-pulse-soft" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[150px]" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <ParticleField />

      {/* Main Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        {/* Left: Text */}
        <div className="flex-1 text-center lg:text-left">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/[0.06] border border-white/[0.12] text-sm text-cyan-300 backdrop-blur-md shadow-lg shadow-cyan-500/5">
              <Sparkles className="w-4 h-4 animate-pulse" />
              AI-Powered Election Education Platform
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            className="mt-8 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-[1.08] tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <span className="gradient-text drop-shadow-sm">
              Understand Democracy.
            </span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-blue-300 to-purple-400 drop-shadow-sm">
              Experience the Election Journey.
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            className="mt-6 text-lg md:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Your interactive guide to the complete election process — from voter registration
            to result declaration. Powered by AI, designed for every citizen.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            <Link href="/journey" className="gradient-button flex items-center justify-center gap-2.5 group text-base px-10 py-4 shadow-lg shadow-blue-500/20">
              <Map className="w-5 h-5" />
              Start Learning
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link href="/chat" className="glass-button flex items-center justify-center gap-2 hover:border-cyan-500/30">
              <Bot className="w-5 h-5 text-cyan-400" />
              Ask AI Assistant
            </Link>
            <Link href="/quiz" className="glass-button flex items-center justify-center gap-2 hover:border-purple-500/30">
              <Brain className="w-5 h-5 text-purple-400" />
              Take the Quiz
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-10 grid grid-cols-3 gap-6 max-w-md mx-auto lg:mx-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {[
              { label: 'Election Steps', value: '8' },
              { label: 'Quiz Questions', value: '15+' },
              { label: 'Glossary Terms', value: '25+' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="text-center lg:text-left"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + i * 0.1 }}
              >
                <div className="text-2xl md:text-3xl font-bold gradient-text-accent">{stat.value}</div>
                <div className="text-xs text-slate-500 mt-1 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Right: Floating Ballot */}
        <motion.div
          className="flex-shrink-0"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <FloatingBallot />
        </motion.div>
      </div>

      {/* Countdown Widget */}
      <motion.div
        className="relative z-10 mt-16 w-full max-w-4xl mx-auto px-4"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Countdown />
      </motion.div>

      {/* Trust Badges */}
      <motion.div
        className="relative z-10 mt-10 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
      >
        <TrustBadges />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="relative z-10 mt-4 mb-8"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-slate-500" />
      </motion.div>
    </section>
  );
}
