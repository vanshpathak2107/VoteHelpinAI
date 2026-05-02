const request = require('supertest');
const app = require('../server');

describe('GET /api/health', () => {
  it('should return 200 with healthy status', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('service', 'VoteSphere AI Backend');
    expect(res.body).toHaveProperty('version', '1.0.0');
    expect(res.body).toHaveProperty('uptime');
    expect(res.body).toHaveProperty('timestamp');
    expect(res.body).toHaveProperty('features');
  });

  it('should include feature flags for Gemini and Firebase', async () => {
    const res = await request(app).get('/api/health');
    expect(res.body.features).toHaveProperty('geminiAI');
    expect(res.body.features).toHaveProperty('firebase');
    expect(typeof res.body.features.geminiAI).toBe('boolean');
    expect(typeof res.body.features.firebase).toBe('boolean');
  });
});
