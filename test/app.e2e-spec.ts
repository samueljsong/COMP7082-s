import request from 'supertest';
import App from '../src/app';
import { AppController } from '../src/app/app.controller';
import { HealthController } from '../src/health/health.controller';

describe('App E2E', () => {
  let app: App;

  beforeAll(() => {
    app = new App([AppController, HealthController]);
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
      const res = await request(app.server).get('/api/health');
      expect(res.statusCode).toBe(200);
    });
  });
});
