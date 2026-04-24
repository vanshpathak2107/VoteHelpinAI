'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, BookOpen, X } from 'lucide-react';
import { GLOSSARY_TERMS } from '@/lib/constants';


export default function GlossarySearch() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const categories = useMemo(() => {
    const cats = new Set(GLOSSARY_TERMS.map(t => t.category));
    return Array.from(cats).sort();
  }, []);

  const filtered = useMemo(() => {
    return GLOSSARY_TERMS.filter(t => {
      const matchesQuery = !query || t.term.toLowerCase().includes(query.toLowerCase()) || t.definition.toLowerCase().includes(query.toLowerCase());
      const matchesCat = !selectedCategory || t.category === selectedCategory;
      return matchesQuery && matchesCat;
    });
  }, [query, selectedCategory]);

  const categoryColors: Record<string, string> = {
    Technology: '#3B82F6', Registration: '#10B981', 'Voting Process': '#8B5CF6',
    Administration: '#F59E0B', Rules: '#EC4899', Governance: '#06B6D4', History: '#F97316',
  };

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="glass-card p-4">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search election terms..."
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/40 focus:bg-white/[0.06] focus:shadow-lg focus:shadow-blue-500/5 transition-all duration-300"
            aria-label="Search glossary"
          />
          {query && (
            <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-white/10 text-slate-500">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 ${!selectedCategory ? 'bg-white/10 text-white border border-white/20 shadow-sm shadow-white/5' : 'bg-white/[0.04] text-slate-500 border border-white/5 hover:text-white hover:bg-white/[0.08]'}`}
        >
          All ({GLOSSARY_TERMS.length})
        </button>
        {categories.map(cat => {
          const count = GLOSSARY_TERMS.filter(t => t.category === cat).length;
          return (
            <button key={cat} onClick={() => setSelectedCategory(selectedCategory === cat ? null : cat)}
              className={`px-3.5 py-2 rounded-full text-xs font-medium transition-all duration-200 flex items-center gap-1.5 ${selectedCategory === cat ? 'bg-white/10 text-white border border-white/20 shadow-sm shadow-white/5' : 'bg-white/[0.04] text-slate-500 border border-white/5 hover:text-white hover:bg-white/[0.08]'}`}>
              <div className="w-2 h-2 rounded-full" style={{ background: categoryColors[cat] || '#64748B' }} />
              {cat} ({count})
            </button>
          );
        })}
      </div>

      {/* Results count */}
      <p className="text-xs text-slate-500">{filtered.length} term{filtered.length !== 1 ? 's' : ''} found</p>

      {/* Terms grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AnimatePresence mode="popLayout">
          {filtered.map((term, i) => (
            <motion.div
              key={term.term}
              layout
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ delay: i * 0.03 }}
              className="glass-card-hover p-5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 flex-shrink-0" style={{ color: categoryColors[term.category] || '#64748B' }} />
                  <h3 className="font-bold text-white">{term.term}</h3>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full border flex-shrink-0" style={{
                  borderColor: `${categoryColors[term.category] || '#64748B'}40`,
                  color: categoryColors[term.category] || '#64748B',
                  background: `${categoryColors[term.category] || '#64748B'}10`,
                }}>
                  {term.category}
                </span>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">{term.definition}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16 glass-card">
          <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
            <BookOpen className="w-14 h-14 text-slate-600 mx-auto mb-4" />
          </motion.div>
          <p className="text-slate-400 text-lg font-medium">No terms found for &quot;{query}&quot;</p>
          <p className="text-slate-500 text-sm mt-1">Try a different search term or category</p>
          <button onClick={() => { setQuery(''); setSelectedCategory(null); }} className="mt-4 text-sm text-blue-400 hover:text-blue-300 transition-colors px-4 py-2 rounded-lg hover:bg-white/5">Clear filters</button>
        </div>
      )}
    </div>
  );
}
