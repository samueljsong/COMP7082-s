import App from '../app';
import request from 'supertest';
import { AuthController } from '../auth/auth.controller';
import { describe, expect, it } from 'vitest';
import { AppController } from '../app/app.controller';
import { HealthController } from '../health/health.controller';
import { UserController } from '../user/user.controller';
import { AdminController } from '../admin/admin.controller';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

/**
 * Need to use swc plugin instedd of the default esbuild in vitest. (to transpile tests file into js code that can be run)
 * esbuild does not support experimental decorators while swc does support them
 */

const testOneUser = {
  user_id: 1,
  email: 'test1@my.bcit.ca',
  first_name: 'test1',
  last_name: 'test1',
  user_type: 'member',
};

describe('auth tests', () => {
  const app = new App([AppController, HealthController, AuthController, AdminController, UserController]);

  it('should response with 200 on successful login', async () => {
    const res = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 'test1' });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'Successful Login');
    expect(res.headers['set-cookie']?.length).toBeGreaterThan(0);
  });

  it('should get user info after successful login', async () => {
    const loginRes = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 'test1' });
    expect(loginRes.status).toBe(200);

    const cookie = loginRes.get('Set-Cookie');

    const meRes = await request(app.server).get('/api/auth/me').set('Cookie', cookie);
    expect(meRes.status).toBe(200);
    expect(meRes.body).toStrictEqual({ statusCode: 200, message: 'User details', ...testOneUser });
  });

  it('should respond with 400 when password is not string', async () => {
    const loginRes = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 123 });
    expect(loginRes.status).toBe(400);
  });

  it('should logout successfully when logged in', async () => {
    const loginRes = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 'test1' });
    expect(loginRes.statusCode).toBe(200);

    const cookie = loginRes.get('Set-Cookie');

    const logoutRes = await request(app.server).get('/api/auth/logout').set('Cookie', cookie);
    expect(logoutRes.statusCode).toBe(200);
    expect(logoutRes.body).toStrictEqual({ statusCode: 200, message: 'Logout' });
  });

  it('should respond with 401 when logging out again with same token', async () => {
    const expectedResponse = {
      statusCode: StatusCodes.UNAUTHORIZED,
      error: ReasonPhrases.UNAUTHORIZED,
      message: 'Blacklisted token',
    };

    const loginRes = await request(app.server)
      .post('/api/auth/login')
      .send({ email: 'test1@my.bcit.ca', password: 'test1' });
    expect(loginRes.statusCode).toBe(200);

    const cookie = loginRes.get('Set-Cookie');

    const logoutRes = await request(app.server).get('/api/auth/logout').set('Cookie', cookie);
    expect(logoutRes.statusCode).toBe(200);

    const failedLogoutRes = await request(app.server).get('/api/auth/logout').set('Cookie', cookie);
    expect(failedLogoutRes.statusCode).toBe(401);
    expect(failedLogoutRes.body).toStrictEqual(expectedResponse);
  });
});
