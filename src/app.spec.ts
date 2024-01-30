import request from 'supertest';
import app from './app';

describe('GET /', () => {
  test('It should respond with 200', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
  });
});

describe('GET /asd', () => {
  test('It should respond with 200', async () => {
    const res = await request(app).get('/asd');
    expect(res.statusCode).toBe(200);
  });
});
