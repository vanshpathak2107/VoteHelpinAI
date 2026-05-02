const request = require('supertest');
const app = require('../server');

describe('POST /api/quiz-score', () => {
  it('should save a valid quiz score', async () => {
    const res = await request(app)
      .post('/api/quiz-score')
      .send({ score: 8, total: 10, badge: 'Expert' });
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('success', true);
    expect(res.body.result).toHaveProperty('score', 8);
    expect(res.body.result).toHaveProperty('total', 10);
    expect(res.body.result).toHaveProperty('percentage', 80);
    expect(res.body.result).toHaveProperty('badge', 'Expert');
  });

  it('should reject when score or total is missing', async () => {
    const res = await request(app)
      .post('/api/quiz-score')
      .send({ score: 5 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should reject when score is greater than total', async () => {
    const res = await request(app)
      .post('/api/quiz-score')
      .send({ score: 15, total: 10 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid score values');
  });

  it('should reject negative score', async () => {
    const res = await request(app)
      .post('/api/quiz-score')
      .send({ score: -1, total: 10 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid score values');
  });

  it('should reject total of 0', async () => {
    const res = await request(app)
      .post('/api/quiz-score')
      .send({ score: 0, total: 0 });
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error', 'Invalid score values');
  });
});

describe('GET /api/quiz-stats', () => {
  it('should return quiz statistics', async () => {
    const res = await request(app).get('/api/quiz-stats');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('totalAttempts');
    expect(res.body).toHaveProperty('averageScore');
    expect(res.body).toHaveProperty('highestScore');
  });
});
