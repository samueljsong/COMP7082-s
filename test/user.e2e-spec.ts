import App from '../src/app';
import { AppController } from '../src/app/app.controller';
import { HealthController } from '../src/health/health.controller';
import { AuthController } from '../src/auth/auth.controller';
import { AdminController } from '../src/admin/admin.controller';
import { UserController } from '../src/user/user.controller';
import { expect, test } from 'vitest';
import request from 'supertest';

test('User creating and viewing reports', async () => {
  const app = new App([AppController, HealthController, AuthController, AdminController, UserController]);

  const loginRes = await request(app.server)
    .post('/api/auth/login')
    .send({ email: 'test1@my.bcit.ca', password: 'test1' });
  expect(loginRes.statusCode).toBe(200);

  const cookie = loginRes.get('Set-Cookie');

  const meRes = await request(app.server).get('/api/auth/me').set('Cookie', cookie);
  expect(meRes.statusCode).toBe(200);

  const user: { user_id: number; email: string; first_name: string; last_name: string; user_type: 'admin' | 'member' } =
    meRes.body;

  const reportRes = await request(app.server).get(`/api/user/${user.user_id}/reports`).set('Cookie', cookie);
  expect(reportRes.statusCode).toBe(200);

  const reportCount = reportRes.body.length;
  for (const report of reportRes.body) {
    expect(report).toHaveProperty('title');
    expect(report).toHaveProperty('description');
    expect(report).toHaveProperty('date_submitted');
  }

  const createReportRes = await request(app.server)
    .post('/api/user/createReport')
    .send({
      locationTagId: 102,
      subject: 'Remote broken',
      description: 'Remote is broken',
      cloudinaryUrl: 'https://res.cloudinary.com/dxp9ftmcw/image/upload/v1710213592/dhkqyxdwg3kuegdgvakb.jpg',
    })
    .set('Cookie', cookie);
  expect(createReportRes.statusCode).toBe(200);

  const reportRes2 = await request(app.server).get(`/api/user/${user.user_id}/reports`).set('Cookie', cookie);
  expect(reportRes2.statusCode).toBe(200);

  const newReportCount = reportRes2.body.length;

  expect(newReportCount > reportCount);

  const logoutRes = await request(app.server).get('/api/auth/logout').set('Cookie', cookie);
  expect(logoutRes.statusCode).toBe(200);

  const failedMeRes = await request(app.server).get('/api/auth/me').set('Cookie', cookie);
  expect(failedMeRes.statusCode).toBe(401);
});
