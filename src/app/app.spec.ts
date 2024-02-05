import request from 'supertest';
import App from '../app';
import { AppRoute } from './app.route';

describe('GET /api', () => {
  let app: App;
  beforeAll(() => {
    app = new App([new AppRoute()], '/api');
  });

  test('App should be defined', () => {
    expect(app).toBeDefined();
  });

  test('It should respond with 200', async () => {
    const res = await request(app.server).get('/api');
    expect(res.statusCode).toBe(200);
  });
});
