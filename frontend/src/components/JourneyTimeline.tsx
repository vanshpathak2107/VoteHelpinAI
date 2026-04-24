'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ClipboardCheck, ShieldCheck, BookOpen, Building, Vote,
  Calculator, Trophy, Eye, ChevronDown, Lightbulb, AlertTriangle,
  Clock, Sparkles, Play, CheckCircle2
} from 'lucide-react';
import { JOURNEY_STEPS, SIMULATION_SCENES, type JourneyStep } from '@/lib/constants';

const iconMap: Record<string, React.ElementType> = {
  'clipboard-check': ClipboardCheck, 'shield-check': ShieldCheck,
  'book-open': BookOpen, 'building': Building, 'vote': Vote,
  'calculator': Calculator, 'trophy': Trophy, 'eye': Eye,
};

function StepCard({ step, isActive, onClick, index }: {
  step: JourneyStep; isActive: boolean; onClick: () => void; index: number;
}) {
  const Icon = iconMap[step.icon] || Vote;
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08 }}
      className="relative"
    >
      {index < JOURNEY_STEPS.length - 1 && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-white/10 to-transparent" />
      )}
      <div className="flex gap-4 sm:gap-6">
        <div className="flex-shrink-0 relative z-10">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="w-12 h-12 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-300 border"
            style={{
              background: isActive ? `${step.color}15` : 'rgba(255,255,255,0.05)',
              borderColor: isActive ? `${step.color}40` : 'rgba(255,255,255,0.1)',
              boxShadow: isActive ? `0 0 20px ${step.color}20` : 'none',
            }}
            onClick={onClick}
          >
            <Icon className="w-5 h-5" style={{ color: step.color }} />
          </motion.div>
        </div>
        <div className="flex-1 pb-8">
          <button onClick={onClick} className="w-full text-left group" aria-expanded={isActive}>
            <div className="glass-card-hover p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${step.color}20`, color: step.color }}>
                      STEP {step.id}
                    </span>
                    {step.deadline && <span className="text-xs text-amber-400/80 flex items-center gap-1"><Clock className="w-3 h-3" /> Deadline</span>}
                  </div>
                  <h3 className="text-lg font-bold text-white">{step.title}</h3>
                  <p className="text-sm text-slate-400 mt-0.5">{step.subtitle}</p>
                </div>
                <motion.div animate={{ rotate: isActive ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-5 h-5 text-slate-500" />
                </motion.div>
              </div>
              <p className="text-sm text-slate-400 mt-3 leading-relaxed">{step.description}</p>
              <AnimatePresence>
                {isActive && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                    <div className="mt-5 space-y-5">
                      <div>
                        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-400" /> What Happens
                        </h4>
                        <ul className="space-y-2">
                          {step.details.map((d, i) => (
                            <motion.li key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }} className="flex items-start gap-2 text-sm text-slate-300">
                              <div className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background: step.color }} />{d}
                            </motion.li>
                          ))}
                        </ul>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                          <h4 className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><Lightbulb className="w-3.5 h-3.5" /> Pro Tips</h4>
                          <ul className="space-y-1.5">{step.tips.map((t, i) => <li key={i} className="text-xs text-slate-400">• {t}</li>)}</ul>
                        </div>
                        <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                          <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-2 flex items-center gap-1.5"><AlertTriangle className="w-3.5 h-3.5" /> Common Mistakes</h4>
                          <ul className="space-y-1.5">{step.commonMistakes.map((m, i) => <li key={i} className="text-xs text-slate-400">• {m}</li>)}</ul>
                        </div>
                      </div>
                      <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/10 flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-semibold text-amber-400 uppercase tracking-wider mb-1">Did You Know?</h4>
                          <p className="text-sm text-slate-300">{step.didYouKnow}</p>
                        </div>
                      </div>
                      {step.deadline && (
                        <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/10 flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-400" /><span className="text-sm text-blue-300 font-medium">{step.deadline}</span>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function SimulationEngine() {
  const [running, setRunning] = useState(false);
  const [currentScene, setCurrentScene] = useState(0);
  const [completed, setCompleted] = useState(false);
  const scene = SIMULATION_SCENES[currentScene];
  const startSimulation = () => { setRunning(true); setCurrentScene(0); setCompleted(false); };
  const advanceScene = () => {
    if (currentScene < SIMULATION_SCENES.length - 1) setCurrentScene(p => p + 1);
    else { setRunning(false); setCompleted(true); }
  };
  return (
    <div className="glass-card p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2"><Play className="w-5 h-5 text-emerald-400" />Election Simulation</h3>
          <p className="text-sm text-slate-400 mt-1">Experience the entire election process step by step</p>
        </div>
        <button onClick={startSimulation} className="gradient-button text-xs flex items-center gap-2"><Play className="w-4 h-4" />{completed ? 'Replay' : running ? 'Restart' : 'Start'}</button>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full mb-6 overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" animate={{ width: running ? `${((currentScene + 1) / SIMULATION_SCENES.length) * 100}%` : completed ? '100%' : '0%' }} transition={{ duration: 0.5 }} />
      </div>
      <AnimatePresence mode="wait">
        {running && scene ? (
          <motion.div key={scene.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center py-8">
            <motion.div className="text-6xl mb-4" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>{scene.emoji}</motion.div>
            <h4 className="text-xl font-bold text-white mb-2">{scene.title}</h4>
            <p className="text-slate-400 max-w-md mx-auto">{scene.description}</p>
            <div className="flex items-center justify-center gap-2 mt-6">
              {SIMULATION_SCENES.map((_, i) => <div key={i} className={`h-2 rounded-full transition-all ${i === currentScene ? 'bg-blue-400 w-6' : i < currentScene ? 'bg-blue-400/40 w-2' : 'bg-white/10 w-2'}`} />)}
            </div>
            <button onClick={advanceScene} className="mt-6 glass-button text-sm mx-auto">{currentScene < SIMULATION_SCENES.length - 1 ? 'Next Step →' : 'Finish ✨'}</button>
          </motion.div>
        ) : completed ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-8">
            <div className="text-6xl mb-4">🎊</div>
            <h4 className="text-xl font-bold text-white mb-2">Simulation Complete!</h4>
            <p className="text-slate-400">You&apos;ve experienced the entire election journey.</p>
          </motion.div>
        ) : (
          <div className="text-center py-8 text-slate-500"><Play className="w-12 h-12 mx-auto mb-3 opacity-30" /><p className="text-sm">Click Start to begin</p></div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function JourneyTimeline() {
  const [activeStep, setActiveStep] = useState<number | null>(null);
  return (
    <div className="space-y-12">
      <SimulationEngine />
      <div className="glass-card p-5">
        <div className="flex items-center gap-3 overflow-x-auto pb-2">
          {JOURNEY_STEPS.map((step, i) => {
            const Icon = iconMap[step.icon] || Vote;
            return (
              <button key={step.id} onClick={() => setActiveStep(activeStep === i ? null : i)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${activeStep === i ? 'bg-white/10 text-white' : 'text-slate-500 hover:text-white hover:bg-white/5'}`}>
                <Icon className="w-3.5 h-3.5" style={{ color: step.color }} />Step {step.id}
              </button>
            );
          })}
        </div>
      </div>
      <div className="space-y-2">
        {JOURNEY_STEPS.map((step, i) => <StepCard key={step.id} step={step} index={i} isActive={activeStep === i} onClick={() => setActiveStep(activeStep === i ? null : i)} />)}
      </div>
    </div>
  );
}
