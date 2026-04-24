'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, Type, Sun, Moon, Volume2, Languages, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

export default function AccessibilityPanel({ onClose }: { onClose: () => void }) {
  const [fontSize, setFontSize] = useState(1);
  const [highContrast, setHighContrast] = useState(false);

  useEffect(() => {
    document.documentElement.style.setProperty('--font-size-multiplier', String(fontSize));
  }, [fontSize]);

  useEffect(() => {
    if (highContrast) {
      document.documentElement.setAttribute('data-contrast', 'high');
    } else {
      document.documentElement.removeAttribute('data-contrast');
    }
  }, [highContrast]);

  const resetAll = () => {
    setFontSize(1);
    setHighContrast(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 300 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 300 }}
      className="fixed top-20 right-4 z-50 w-80 glass-card p-5"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sun className="w-4 h-4 text-amber-400" />
          Accessibility
        </h3>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors text-slate-400 hover:text-white"
          aria-label="Close accessibility panel"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Font Size */}
      <div className="mb-5">
        <label className="text-xs text-slate-400 font-medium mb-2 block">
          <Type className="w-3.5 h-3.5 inline mr-1.5" />
          Font Size ({Math.round(fontSize * 100)}%)
        </label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFontSize(Math.max(0.8, fontSize - 0.1))}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Decrease font size"
          >
            <ZoomOut className="w-4 h-4 text-slate-300" />
          </button>
          <div className="flex-1 h-2 bg-white/5 rounded-full relative">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all"
              style={{ width: `${((fontSize - 0.8) / 0.6) * 100}%` }}
            />
          </div>
          <button
            onClick={() => setFontSize(Math.min(1.4, fontSize + 0.1))}
            className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
            aria-label="Increase font size"
          >
            <ZoomIn className="w-4 h-4 text-slate-300" />
          </button>
        </div>
      </div>

      {/* High Contrast */}
      <div className="mb-5">
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all ${
            highContrast
              ? 'bg-amber-500/10 border-amber-500/30 text-amber-300'
              : 'bg-white/5 border-white/10 text-slate-400'
          }`}
        >
          <span className="flex items-center gap-2 text-sm font-medium">
            {highContrast ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            High Contrast
          </span>
          <div className={`w-10 h-5 rounded-full transition-colors ${highContrast ? 'bg-amber-500' : 'bg-white/20'}`}>
            <div className={`w-4 h-4 rounded-full bg-white shadow transition-transform mt-0.5 ${highContrast ? 'translate-x-5' : 'translate-x-0.5'}`} />
          </div>
        </button>
      </div>

      {/* Voice Reading */}
      <div className="mb-5">
        <button
          onClick={() => {
            if ('speechSynthesis' in window) {
              const selection = window.getSelection()?.toString();
              if (selection) {
                const utterance = new SpeechSynthesisUtterance(selection);
                speechSynthesis.speak(utterance);
              } else {
                const utterance = new SpeechSynthesisUtterance('Select text on the page, then click this button to hear it read aloud.');
                speechSynthesis.speak(utterance);
              }
            }
          }}
          className="w-full flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Volume2 className="w-4 h-4 text-cyan-400" />
          Read Selected Text Aloud
        </button>
      </div>

      {/* Language indicator */}
      <div className="mb-5">
        <div className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-500">
          <Languages className="w-4 h-4" />
          <span>Multi-language: English (Active)</span>
        </div>
      </div>

      {/* Reset */}
      <button
        onClick={resetAll}
        className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-slate-500 hover:text-white hover:bg-white/10 transition-all"
      >
        <RotateCcw className="w-3.5 h-3.5" />
        Reset to Defaults
      </button>
    </motion.div>
  );
}
