const express = require('express');
const router = express.Router();

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 15;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(ip, { start: now, count: 1 });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

// Fallback answers for when Gemini is unavailable
const FALLBACK_ANSWERS = {
  'register': 'To register as a voter in India, fill Form 6 on the NVSP portal (nvsp.in) or visit your nearest ERO office. You must be 18+ years old and provide identity and address proof.',
  'missing': 'If your name is missing from the voter list: 1) Check NVSP portal, 2) File Form 6, 3) Contact your BLO, 4) Call helpline 1950.',
  'count': 'After polling, EVMs are sealed and stored in strong rooms under 24/7 CCTV. On counting day, votes are tallied round by round. Postal ballots first, then EVM votes.',
  'nota': 'NOTA (None Of The Above) lets voters reject all candidates. Introduced in 2013 by Supreme Court. It appears as the last option on the EVM.',
  'evm': 'An EVM is a portable, battery-operated voting device with a Control Unit and Ballot Unit. Voters press the blue button next to their candidate. A beep confirms the vote.',
  'document': 'You can vote using 12 approved photo IDs: Voter ID, Aadhaar, Passport, Driving License, PAN Card, bank passbook with photo, and more.',
  'vvpat': 'VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing the candidate name and symbol, visible for 7 seconds, so voters can verify their vote.',
};

function getFallbackAnswer(query) {
  const q = query.toLowerCase();
  for (const [key, answer] of Object.entries(FALLBACK_ANSWERS)) {
    if (q.includes(key)) return answer;
  }
  return 'I can help with questions about voter registration, voting process, EVMs, NOTA, required documents, vote counting, and election results. Please ask a specific question about Indian elections!';
}

// Input sanitization
function sanitize(str) {
  if (typeof str !== 'string') return '';
  return str.replace(/[<>]/g, '').trim().substring(0, 500);
}

/**
 * POST /api/chat
 * Send a message to the AI election assistant
 */
router.post('/chat', async (req, res) => {
  try {
    const ip = req.ip || 'unknown';
    if (!checkRateLimit(ip)) {
      return res.status(429).json({ error: 'Too many requests. Please wait a moment.' });
    }

    const { message } = req.body;
    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const cleanMessage = sanitize(message);
    if (cleanMessage.length < 2) {
      return res.status(400).json({ error: 'Message too short' });
    }

    // Try Gemini API if key is configured
    if (process.env.GEMINI_API_KEY) {
      try {
        const { GoogleGenerativeAI } = require('@google/generative-ai');
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

        const systemPrompt = `You are VoteSphere AI, an educational election assistant specializing in Indian elections and democracy. 
Rules:
- Give clear, accurate, concise answers (2-4 sentences max)
- Focus on Indian election process, voter registration, EVMs, NOTA, election commission
- Be helpful and educational
- If the question is not about elections/democracy, politely redirect
- Never give political opinions or support any party
- Use simple language anyone can understand`;

        const result = await model.generateContent(`${systemPrompt}\n\nUser question: ${cleanMessage}`);
        const response = result.response.text();
        
        return res.json({ response, source: 'gemini' });
      } catch (aiError) {
        console.error('Gemini API error:', aiError.message);
        // Fall through to fallback
      }
    }

    // Fallback response
    const fallback = getFallbackAnswer(cleanMessage);
    return res.json({ response: fallback, source: 'fallback' });

  } catch (error) {
    console.error('Chat error:', error.message);
    res.status(500).json({ error: 'Failed to process message' });
  }
});

module.exports = router;
