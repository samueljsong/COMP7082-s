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
      .send({ email: 'aliu142@my.bcit.ca', password: 'asd' });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('statusCode', 200);
    expect(res.body).toHaveProperty('message', 'Successful Login');
    expect(res.headers['set-cookie'].length).toBeGreaterThan(0);
  });
});
