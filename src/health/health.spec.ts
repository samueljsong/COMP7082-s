import { StatusCodes } from 'http-status-codes';
import App from '../app';
import request from 'supertest';
import { HealthController } from './health.controller';

describe('Health [ /health ]', () => {
  let app: App;

  beforeAll(() => {
    app = new App([HealthController]);
  });

  describe('App', () => {
    it('should be defined', () => {
      expect(app).toBeDefined();
    });
  });

  describe('Health check', () => {
    it('should reponse with 200', async () => {
      const res = await request(app.server).get('/api/health');
      expect(res.statusCode).toBe(StatusCodes.OK);
    });
  });
});
