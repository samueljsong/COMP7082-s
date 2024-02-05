import request from 'supertest';
import App from '../src/app';
import { HealthRoute } from '../src/health/health.route';
import { AppRoute } from '../src/app/app.route';

describe('App E2E', () => {
  let app: App;

  beforeAll(() => {
    app = new App([new AppRoute(), new HealthRoute()], '/api');
  });

  describe('App', () => {
    it('should be defined', () => {
      expect(app).toBeDefined();
    });
  });

  describe('Going to app', () => {
    it('should respond with 200', async () => {
      const res = await request(app.server).get('/api');
      expect(res.statusCode).toBe(200);
    });
  });

  describe('Health Check', () => {
    it('should responsd with 200', async () => {
      const res = await request(app.server).get('/health');
      expect(res.statusCode).toBe(200);
    });
  });
});
