import { StatusCodes } from 'http-status-codes';
import App from '../app';
import { HealthRoute } from './health.route';
import request from 'supertest';

describe('Health [ /health ]', () => {
  let app: App;

  beforeAll(() => {
    app = new App([new HealthRoute()]);
  });

  describe('App', () => {
    it('should be defined', () => {
      expect(app).toBeDefined();
    });
  });

  describe('Health check', () => {
    it('should reponse with 200', async () => {
      const res = await request(app.server).get('/health');
      expect(res.statusCode).toBe(StatusCodes.OK);
    });
  });
});
