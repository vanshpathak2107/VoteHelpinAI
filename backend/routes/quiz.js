const express = require('express');
const router = express.Router();

// In-memory quiz scores (use Firestore in production)
const quizScores = [];

/**
 * POST /api/quiz-score
 * Save a quiz result
 */
router.post('/quiz-score', (req, res) => {
  try {
    const { score, total, percentage, badge, timestamp } = req.body;

    if (typeof score !== 'number' || typeof total !== 'number') {
      return res.status(400).json({ error: 'Score and total are required numbers' });
    }

    if (score < 0 || score > total || total <= 0) {
      return res.status(400).json({ error: 'Invalid score values' });
    }

    const result = {
      id: Date.now().toString(),
      score,
      total,
      percentage: percentage || Math.round((score / total) * 100),
      badge: badge || 'Unknown',
      timestamp: timestamp || new Date().toISOString(),
    };

    quizScores.push(result);
    
    // Keep only last 100 scores in memory
    if (quizScores.length > 100) quizScores.shift();

    res.status(201).json({ success: true, result });
  } catch (error) {
    console.error('Quiz score error:', error.message);
    res.status(500).json({ error: 'Failed to save quiz score' });
  }
});

/**
 * GET /api/quiz-stats
 * Get aggregate quiz statistics
 */
router.get('/quiz-stats', (req, res) => {
  try {
    if (quizScores.length === 0) {
      return res.json({ totalAttempts: 0, averageScore: 0, highestScore: 0 });
    }

    const scores = quizScores.map(s => s.percentage);
    res.json({
      totalAttempts: quizScores.length,
      averageScore: Math.round(scores.reduce((a, b) => a + b, 0) / scores.length),
      highestScore: Math.max(...scores),
      recentScores: quizScores.slice(-5).reverse(),
    });
  } catch (error) {
    console.error('Quiz stats error:', error.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

module.exports = router;
