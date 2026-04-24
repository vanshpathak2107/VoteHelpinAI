const express = require('express');
const router = express.Router();

const startTime = Date.now();

/**
 * GET /api/health
 * System health check
 */
router.get('/health', (req, res) => {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  res.json({
    status: 'healthy',
    service: 'VoteSphere AI Backend',
    version: '1.0.0',
    uptime: `${uptime}s`,
    timestamp: new Date().toISOString(),
    features: {
      geminiAI: !!process.env.GEMINI_API_KEY,
      firebase: !!process.env.FIREBASE_PROJECT_ID,
    },
  });
});

module.exports = router;
