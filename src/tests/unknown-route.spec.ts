import { describe, expect, it } from 'vitest';
import request from 'supertest';
import App from '../app';
import { AppController } from '../app/app.controller';

describe('making requests', () => {
  const app = new App([AppController]);

  it('should respond with 200 if route exists', async () => {
    const res = await request(app.server).get('/api');

    expect(res.status).toBe(200);
    expect(res.body.error).toBeUndefined();
  });

  it('should respond with 404 if route does not exist', async () => {
    const res = await request(app.server).get('/api/hello');

    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('message');
    console.log(res.body);
    expect(res.body.message).toMatch(/cannot get \/hello/i);
  });
});
