'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ArrowRight, BookOpen, Brain, Bot, Map, BarChart3, X, Zap } from 'lucide-react';
import { GLOSSARY_TERMS, NAV_LINKS } from '@/lib/constants';

interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon: React.ElementType;
  action: () => void;
  category: string;
}

export default function CommandPalette({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const items: CommandItem[] = useMemo(() => {
    const iconMap: Record<string, React.ElementType> = {
      home: Zap, map: Map, bot: Bot, brain: Brain,
      'book-open': BookOpen, 'bar-chart-3': BarChart3,
    };

    const navItems: CommandItem[] = NAV_LINKS.map(l => ({
      id: `nav-${l.href}`,
      label: l.label,
      description: `Go to ${l.label}`,
      icon: iconMap[l.icon] || Zap,
      action: () => { router.push(l.href); onClose(); },
      category: 'Navigation',
    }));

    const glossaryItems: CommandItem[] = GLOSSARY_TERMS.slice(0, 10).map(t => ({
      id: `glossary-${t.term}`,
      label: t.term,
      description: t.definition.substring(0, 80) + '...',
      icon: BookOpen,
      action: () => { router.push('/glossary'); onClose(); },
      category: 'Glossary',
    }));

    const quickActions: CommandItem[] = [
      {
        id: 'quiz-start',
        label: 'Start Election Quiz',
        description: 'Test your election knowledge',
        icon: Brain,
        action: () => { router.push('/quiz'); onClose(); },
        category: 'Quick Actions',
      },
      {
        id: 'ai-chat',
        label: 'Ask AI Assistant',
        description: 'Chat with the election AI',
        icon: Bot,
        action: () => { router.push('/chat'); onClose(); },
        category: 'Quick Actions',
      },
    ];

    return [...quickActions, ...navItems, ...glossaryItems];
  }, [router, onClose]);

  const filtered = useMemo(() => {
    if (!query) return items.slice(0, 8);
    const q = query.toLowerCase();
    return items.filter(i =>
      i.label.toLowerCase().includes(q) ||
      i.description?.toLowerCase().includes(q) ||
      i.category.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query, items]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => Math.min(prev + 1, filtered.length - 1));
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => Math.max(prev - 1, 0));
      }
      if (e.key === 'Enter' && filtered[selectedIndex]) {
        filtered[selectedIndex].action();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [filtered, selectedIndex, onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      />

      {/* Palette */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: -20 }}
        className="fixed top-[20%] left-1/2 -translate-x-1/2 z-50 w-full max-w-lg"
      >
        <div className="glass-card overflow-hidden mx-4">
          {/* Search input */}
          <div className="flex items-center gap-3 p-4 border-b border-white/10">
            <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search pages, glossary, actions..."
              className="flex-1 bg-transparent text-white text-sm outline-none placeholder:text-slate-500"
              aria-label="Command palette search"
            />
            <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Results */}
          <div className="max-h-80 overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-slate-500 text-sm">
                No results found for &quot;{query}&quot;
              </div>
            ) : (
              <>
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIndex(i)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors ${
                      i === selectedIndex ? 'bg-white/10' : 'hover:bg-white/5'
                    }`}
                  >
                    <item.icon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-white truncate">{item.label}</p>
                      {item.description && (
                        <p className="text-xs text-slate-500 truncate">{item.description}</p>
                      )}
                    </div>
                    <span className="text-[10px] text-slate-600 px-1.5 py-0.5 rounded bg-white/5">
                      {item.category}
                    </span>
                    {i === selectedIndex && <ArrowRight className="w-3 h-3 text-slate-400" />}
                  </button>
                ))}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-4 py-2.5 border-t border-white/5 flex items-center gap-4 text-[10px] text-slate-600">
            <span><kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-400 font-mono">↑↓</kbd> Navigate</span>
            <span><kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-400 font-mono">↵</kbd> Select</span>
            <span><kbd className="px-1 py-0.5 rounded bg-white/10 text-slate-400 font-mono">Esc</kbd> Close</span>
          </div>
        </div>
      </motion.div>
    </>
  );
}
