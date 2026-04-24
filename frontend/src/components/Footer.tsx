'use client';

import { Heart } from 'lucide-react';
import Link from 'next/link';

const footerLinks = [
  { label: 'Journey', href: '/journey' },
  { label: 'AI Chat', href: '/chat' },
  { label: 'Quiz', href: '/quiz' },
  { label: 'Glossary', href: '/glossary' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 bg-[#0F172A]/90 backdrop-blur-md" role="contentinfo">
      {/* Gradient top line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Top section */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md shadow-purple-500/20 hover:shadow-purple-500/40 hover:scale-105 transition-all duration-300">
                <span className="text-white font-bold text-xs tracking-wider">VS</span>
              </div>
              <span className="text-base font-bold gradient-text">VoteSphere AI</span>
            </div>
            <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
              AI-powered interactive election education platform. Learn, quiz, and explore Indian democracy — built for every citizen.
            </p>
          </div>
          <nav className="flex flex-wrap gap-x-8 gap-y-2" aria-label="Footer navigation">
            {footerLinks.map(link => (
              <Link key={link.href} href={link.href} className="text-sm text-slate-500 hover:text-white transition-colors duration-200 relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-gradient-to-r after:from-blue-500 after:to-purple-500 hover:after:w-full after:transition-all after:duration-300">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-white/[0.06] pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400 animate-pulse" />
              <span>for democracy</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-600">
              <span className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">Next.js</span>
              <span className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">Gemini AI</span>
              <span className="px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.06]">Framer Motion</span>
              <span className="hidden sm:inline text-slate-700">•</span>
              <span className="hidden sm:inline">© {new Date().getFullYear()} VoteSphere AI</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
