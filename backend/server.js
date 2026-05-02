require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const chatRoutes = require('./routes/chat');
const glossaryRoutes = require('./routes/glossary');
const quizRoutes = require('./routes/quiz');
const healthRoutes = require('./routes/health');

const app = express();
const PORT = process.env.PORT || 8080;

// ─── Middleware ────────────────────────────
app.use(helmet());

// CORS: support multiple origins for production + local dev
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:3000',
  'http://localhost:5173',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (curl, health checks, server-to-server)
    if (!origin || allowedOrigins.some(allowed => origin.startsWith(allowed))) {
      callback(null, true);
    } else {
      console.warn(`CORS blocked origin: ${origin}`);
      callback(null, false);
    }
  },
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));
app.use(express.json({ limit: '1mb' }));

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// ─── Routes ───────────────────────────────
app.use('/api', healthRoutes);
app.use('/api', chatRoutes);
app.use('/api', glossaryRoutes);
app.use('/api', quizRoutes);

// ─── 404 Handler ──────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// ─── Global Error Handler ─────────────────
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// ─── Start Server ─────────────────────────
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`\n🗳️  VoteSphere AI Backend running on port ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Chat:   POST http://localhost:${PORT}/api/chat`);
    console.log(`   Glossary: http://localhost:${PORT}/api/glossary\n`);
  });
}

module.exports = app;
