const request = require('supertest');
const app = require('../server');

describe('GET /api/glossary', () => {
  it('should return all glossary terms', async () => {
    const res = await request(app).get('/api/glossary');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('terms');
    expect(res.body).toHaveProperty('total');
    expect(Array.isArray(res.body.terms)).toBe(true);
    expect(res.body.total).toBeGreaterThan(0);
    // Verify term shape
    const term = res.body.terms[0];
    expect(term).toHaveProperty('term');
    expect(term).toHaveProperty('definition');
    expect(term).toHaveProperty('category');
  });

  it('should filter terms by search query', async () => {
    const res = await request(app).get('/api/glossary?q=EVM');
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThan(0);
    const allMatch = res.body.terms.every(
      (t) =>
        t.term.toLowerCase().includes('evm') ||
        t.definition.toLowerCase().includes('evm')
    );
    expect(allMatch).toBe(true);
  });

  it('should filter terms by category', async () => {
    const res = await request(app).get('/api/glossary?category=Technology');
    expect(res.status).toBe(200);
    expect(res.body.total).toBeGreaterThan(0);
    const allMatch = res.body.terms.every(
      (t) => t.category.toLowerCase() === 'technology'
    );
    expect(allMatch).toBe(true);
  });

  it('should return empty array for non-matching search', async () => {
    const res = await request(app).get('/api/glossary?q=xyznonexistent');
    expect(res.status).toBe(200);
    expect(res.body.terms).toEqual([]);
    expect(res.body.total).toBe(0);
  });
});
