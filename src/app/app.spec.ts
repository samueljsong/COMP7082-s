import request from 'supertest';
import App from '../app';
import { AppController } from './app.controller';

describe('GET /api', () => {
  let app: App;
  beforeAll(() => {
    app = new App([AppController]);
  });

  test('App should be defined', () => {
    expect(app).toBeDefined();
  });

  test('It should respond with 200', async () => {
    const res = await request(app.server).get('/api');
    expect(res.statusCode).toBe(200);
  });
});
