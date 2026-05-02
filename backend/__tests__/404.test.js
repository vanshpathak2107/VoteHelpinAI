const request = require('supertest');
const app = require('../server');

describe('404 Handler', () => {
  it('should return 404 for unknown GET routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Endpoint not found');
  });

  it('should return 404 for unknown POST routes', async () => {
    const res = await request(app)
      .post('/api/nonexistent')
      .send({ data: 'test' });
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error', 'Endpoint not found');
  });
});
