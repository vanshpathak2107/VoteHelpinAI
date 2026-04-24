'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User, Mic, MicOff, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { SUGGESTED_PROMPTS } from '@/lib/constants';
import { safeFetch, getApiUrl } from '@/lib/utils';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

const FALLBACK_ANSWERS: Record<string, string> = {
  'register': 'To register as a voter in India, you need to fill Form 6 on the NVSP portal (nvsp.in) or visit your nearest ERO office. You must be 18+ years old and provide identity and address proof. Your BLO will verify your details, and once approved, you receive your EPIC (Voter ID).',
  'missing': 'If your name is missing from the voter list, you can: 1) Check the NVSP portal or Voter Helpline app, 2) File Form 6 for fresh registration, 3) Contact your local BLO, 4) Visit the nearest ERO office. You can also call the Election Commission helpline 1950.',
  'count': 'After polling ends, EVMs are sealed and stored in strong rooms under 24/7 CCTV and armed security. On counting day, votes are tallied round by round. Postal ballots are counted first, then EVM votes. VVPAT slips from 5 random booths per constituency are verified against EVM results.',
  'nota': 'NOTA (None Of The Above) allows voters to reject all candidates. Introduced in 2013 by Supreme Court order, it appears as the last option on the EVM. If NOTA gets the most votes, the candidate with the next highest votes still wins — NOTA doesn\'t invalidate the election.',
  'document': 'You can vote using any of 12 approved photo IDs: Voter ID (EPIC), Aadhaar, Passport, Driving License, PAN Card, Smart Card issued by RGI, bank passbook with photo, MNREGA job card, health insurance smart card, pension document with photo, service ID for government employees, or student ID for students.',
  'evm': 'An EVM (Electronic Voting Machine) is a portable, battery-operated device. It has two units: the Control Unit (with the Presiding Officer) and the Ballot Unit (in the voting compartment). The voter presses the blue button next to their chosen candidate. A beep confirms the vote. EVMs are standalone and not connected to any network.',
};

function getFallbackAnswer(query: string): string {
  const q = query.toLowerCase();
  if (q.includes('register') || q.includes('registration') || q.includes('sign up')) return FALLBACK_ANSWERS['register'];
  if (q.includes('missing') || q.includes('not found') || q.includes('name')) return FALLBACK_ANSWERS['missing'];
  if (q.includes('count') || q.includes('counting') || q.includes('tally')) return FALLBACK_ANSWERS['count'];
  if (q.includes('nota') || q.includes('none of the above') || q.includes('reject')) return FALLBACK_ANSWERS['nota'];
  if (q.includes('document') || q.includes('id') || q.includes('identity') || q.includes('proof')) return FALLBACK_ANSWERS['document'];
  if (q.includes('evm') || q.includes('machine') || q.includes('electronic')) return FALLBACK_ANSWERS['evm'];
  return 'I can help you with questions about voter registration, the voting process, EVMs, NOTA, required documents, vote counting, and election results. Please ask a specific question about Indian elections!';
}

// Safe SpeechRecognition access
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getSpeechRecognition(): any {
  if (typeof window === 'undefined') return null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const win = window as any;
  return win.SpeechRecognition || win.webkitSpeechRecognition || null;
}

export default function ChatAssistant() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '0', role: 'assistant', content: 'Hello! I\'m your AI Election Assistant. Ask me anything about the Indian election process — voter registration, voting procedures, EVMs, NOTA, and more!', timestamp: Date.now() }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || loading) return;
    setError('');
    const userMsg: Message = { id: Date.now().toString(), role: 'user', content: text.trim(), timestamp: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await safeFetch(getApiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      }, 8000);

      if (!res.ok) throw new Error('API error');
      const data = await res.json();
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: data.response || data.message || 'No response received.', timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } catch {
      const fallback = getFallbackAnswer(text);
      const aiMsg: Message = { id: (Date.now() + 1).toString(), role: 'assistant', content: fallback, timestamp: Date.now() };
      setMessages(prev => [...prev, aiMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  }, [loading]);

  const toggleVoice = useCallback(() => {
    const SpeechRecognitionCtor = getSpeechRecognition();
    if (!SpeechRecognitionCtor) {
      setError('Voice input not supported in this browser');
      return;
    }
    if (isListening) { setIsListening(false); return; }
    setIsListening(true);

    try {
      const recognition = new SpeechRecognitionCtor();
      recognition.lang = 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (e: { results: { transcript: string }[][] }) => {
        const text = e.results[0][0].transcript;
        setInput(text);
        setIsListening(false);
        sendMessage(text);
      };
      recognition.onerror = () => {
        setIsListening(false);
        setError('Voice input failed. Try again.');
      };
      recognition.onend = () => setIsListening(false);
      recognition.start();
    } catch {
      setIsListening(false);
      setError('Could not start voice input.');
    }
  }, [isListening, sendMessage]);

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] max-h-[700px]">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div key={msg.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : ''}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-md shadow-purple-500/20">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-first' : ''}`}>
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-tr-sm chat-bubble-user' : 'glass-card text-slate-200 rounded-tl-sm chat-bubble-assistant'}`}>
                  {msg.content}
                </div>
                {msg.role === 'assistant' && (
                  <button onClick={() => speakText(msg.content)} className="mt-1 ml-1 p-1 rounded text-slate-600 hover:text-cyan-400 transition-colors" aria-label="Read aloud">
                    <Volume2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/10 flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4 text-slate-300" />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/20"><Bot className="w-4 h-4 text-white" /></div>
            <div className="glass-card p-4 rounded-2xl rounded-tl-sm">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <div className="typing-dots"><span></span><span></span><span></span></div>
                <span className="text-xs">Thinking...</span>
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Error */}
      {error && (
        <div className="mx-4 mb-2 p-2 rounded-lg bg-red-500/10 border border-red-500/20 text-xs text-red-400 flex items-center gap-2">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />{error}
        </div>
      )}

      {/* Suggested Prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-3">
          <p className="text-xs text-slate-500 mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3" />Suggested questions</p>
          <div className="flex flex-wrap gap-2">
            {SUGGESTED_PROMPTS.slice(0, 4).map((p, i) => (
              <button key={i} onClick={() => sendMessage(p)} className="text-xs px-3.5 py-2 rounded-full bg-white/[0.04] border border-white/[0.08] text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200 hover:shadow-sm hover:shadow-purple-500/10">
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-white/5">
        <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex items-center gap-2">
          <button type="button" onClick={toggleVoice} className={`p-2.5 rounded-xl transition-all ${isListening ? 'bg-red-500/20 text-red-400 animate-pulse' : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'}`} aria-label="Voice input">
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about elections..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-blue-500/50 transition-colors"
            disabled={loading}
          />
          <button type="submit" disabled={!input.trim() || loading} className="p-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white disabled:opacity-30 hover:shadow-neon-blue transition-all">
            <Send className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  );
}
