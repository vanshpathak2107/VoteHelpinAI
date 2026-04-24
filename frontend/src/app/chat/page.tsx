'use client';

import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';
import ChatAssistant from '@/components/ChatAssistant';

export default function ChatPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-xs text-purple-400 mb-4">
            <Bot className="w-3.5 h-3.5" /> AI-Powered
          </div>
          <h1 className="section-heading gradient-text">AI Election Assistant</h1>
          <p className="text-slate-400 max-w-lg mx-auto">Ask anything about the Indian election process. Voice input supported!</p>
        </motion.div>
        <div className="glass-card overflow-hidden">
          <ChatAssistant />
        </div>
      </div>
    </div>
  );
}
