import request from 'supertest';
import App from '../app';
import { AuthController } from '../auth/auth.controller';
import { describe, expect, it } from 'vitest';
import { AppController } from '../app/app.controller';
import { HealthController } from '../health/health.controller';
import { UserController } from '../user/user.controller';
import { AdminController } from '../admin/admin.controller';

describe('auth tests', () => {
  const app = new App([AppController, HealthController, AuthController, AdminController, UserController]);

  it('should response with 200 on successful login', async () => {
    const res = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 'test1' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'Successful Login');
    expect(res.headers['set-cookie'].length).toBeGreaterThan(0);
  });

  it('should get user info after successful login', async () => {
    const testOneUser = {
      user_id: 1,
      email: 'test1@my.bcit.ca',
      first_name: 'test1',
      last_name: 'test1',
      user_type: 'member',
    };
    const loginRes = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 'test1' });
    expect(loginRes.statusCode).toBe(200);

    const cookie = loginRes.get('Set-Cookie');

    const meRes = await request(app.server).get('/api/auth/me').set('Cookie', cookie);
    expect(meRes.statusCode).toBe(200);
    expect(meRes.body).toStrictEqual({ statusCode: 200, message: 'User details', ...testOneUser });
  });
});
