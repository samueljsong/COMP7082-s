import request from 'supertest';
import app from '../src/app';

describe('App E2E', () => {
  describe('Going to app', () => {
    it('should respond with 200', async () => {
      const res = await request(app).get('/');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Health check', () => {
    it('should responsd with 200', async () => {
      const res = await request(app).get('/health');
      expect(res.statusCode).toBe(200);
    });
  });
});
