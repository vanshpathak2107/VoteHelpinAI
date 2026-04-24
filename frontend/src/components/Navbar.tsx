'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home, Map, Bot, Brain, BookOpen, BarChart3, Menu, X, Sparkles,
  Accessibility
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NAV_LINKS } from '@/lib/constants';
import AccessibilityPanel from './AccessibilityPanel';
import CommandPalette from './CommandPalette';

const iconMap: Record<string, React.ElementType> = {
  home: Home, map: Map, bot: Bot, brain: Brain,
  'book-open': BookOpen, 'bar-chart-3': BarChart3,
};

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showAccessibility, setShowAccessibility] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Cmd+K handler
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette(prev => !prev);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[#0F172A]/80 backdrop-blur-xl border-b border-white/10 shadow-lg'
            : 'bg-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group">
              <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-neon-blue group-hover:shadow-neon-purple transition-shadow duration-300">
                <span className="text-white font-bold text-sm">VS</span>
                <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
              </div>
              <span className="text-lg font-bold gradient-text hidden sm:block">
                VoteSphere AI
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => {
                const Icon = iconMap[link.icon];
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'relative px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1.5',
                      isActive
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white hover:bg-white/5'
                    )}
                  >
                    {Icon && <Icon className="w-4 h-4" />}
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="navbar-active"
                        className="absolute inset-0 bg-white/10 rounded-lg border border-white/10"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              {/* Cmd+K button */}
              <button
                onClick={() => setShowCommandPalette(true)}
                className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-slate-400 hover:text-white hover:border-white/20 transition-all"
                aria-label="Open command palette"
              >
                <Sparkles className="w-3 h-3" />
                <span>Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px] font-mono">⌘K</kbd>
              </button>

              {/* Accessibility */}
              <button
                onClick={() => setShowAccessibility(!showAccessibility)}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Accessibility settings"
              >
                <Accessibility className="w-5 h-5" />
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#0F172A]/95 backdrop-blur-xl border-b border-white/10"
            >
              <div className="px-4 py-3 space-y-1">
                {NAV_LINKS.map((link) => {
                  const Icon = iconMap[link.icon];
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                        isActive
                          ? 'bg-white/10 text-white'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                      )}
                    >
                      {Icon && <Icon className="w-5 h-5" />}
                      {link.label}
                    </Link>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Accessibility Panel */}
      <AnimatePresence>
        {showAccessibility && (
          <AccessibilityPanel onClose={() => setShowAccessibility(false)} />
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <CommandPalette onClose={() => setShowCommandPalette(false)} />
        )}
      </AnimatePresence>
    </>
  );
}
