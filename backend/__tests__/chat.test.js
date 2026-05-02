const request = require('supertest');

// Ensure Gemini is NOT used — tests must run without external services
delete process.env.GEMINI_API_KEY;

const app = require('../server');

describe('POST /api/chat', () => {
  it('should return a fallback response for a valid message', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'How do I register to vote?' });
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('response');
    expect(res.body).toHaveProperty('source', 'fallback');
    expect(typeof res.body.response).toBe('string');
    expect(res.body.response.length).toBeGreaterThan(0);
  });

  it('should match keyword-based fallback for "EVM"', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'Tell me about evm' });
    expect(res.status).toBe(200);
    expect(res.body.source).toBe('fallback');
    expect(res.body.response.toLowerCase()).toContain('evm');
  });

  it('should return 400 when message is missing', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({});
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when message is not a string', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 12345 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 when message is too short', async () => {
    const res = await request(app)
      .post('/api/chat')
      .send({ message: 'a' });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Message too short');
  });
});
