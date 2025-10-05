import request from 'supertest';
import app from '../app.js';

describe('GET /api/inventory', () => {
  it('should return all items', async () => {
    const res = await request(app).get('/inventory');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
