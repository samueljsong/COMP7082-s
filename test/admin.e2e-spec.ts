import App from '../src/app';
import { AppController } from '../src/app/app.controller';
import { HealthController } from '../src/health/health.controller';
import { AuthController } from '../src/auth/auth.controller';
import { AdminController } from '../src/admin/admin.controller';
import { UserController } from '../src/user/user.controller';
import { expect, test } from 'vitest';
import request from 'supertest';

test('Admin reviewing and changing report status', async () => {
  const app = new App([AppController, HealthController, AuthController, AdminController, UserController]);

  const loginRes = await request(app.server)
    .post('/api/auth/login')
    .send({ email: 'test3@my.bcit.ca', password: 'test3' });
  expect(loginRes.statusCode).toBe(200);

  const cookie = loginRes.get('Set-Cookie');

  const meRes = await request(app.server).get('/api/auth/me').set('Cookie', cookie);
  expect(meRes.statusCode).toBe(200);

  const user: { user_id: number; email: string; first_name: string; last_name: string; user_type: 'admin' | 'member' } =
    meRes.body;

  const reportRes = await request(app.server).get(`/api/user/1/reports`).set('Cookie', cookie);
  expect(reportRes.statusCode).toBe(200);

  for (const report of reportRes.body) {
    expect(report).toHaveProperty('title');
    expect(report).toHaveProperty('description');
    expect(report).toHaveProperty('date_submitted');
    switch (report.report_id) {
      case 1: {
        const changeStatusRes = await request(app.server)
          .patch(`/api/admin/${report.report_id}/change-state/3`)
          .set('Cookie', cookie);
        expect(changeStatusRes.statusCode).toBe(200);

        const reportRes = await request(app.server).get(`/api/admin/${report.report_id}/report`).set('Cookie', cookie);
        expect(reportRes.statusCode).toBe(200);
        expect(reportRes.body).toHaveProperty('status_id', 3);
        break;
      }
      case 2: {
        const changeStatusRes = await request(app.server)
          .patch(`/api/admin/${report.report_id}/change-state/2`)
          .set('Cookie', cookie);
        expect(changeStatusRes.statusCode).toBe(200);

        const reportRes = await request(app.server).get(`/api/admin/${report.report_id}/report`).set('Cookie', cookie);
        expect(reportRes.statusCode).toBe(200);
        expect(reportRes.body).toHaveProperty('status_id', 2);
        break;
      }
    }
  }

  const logoutRes = await request(app.server).get('/api/auth/logout').set('Cookie', cookie);
  expect(logoutRes.statusCode).toBe(200);

  const failedMeRes = await request(app.server).get('/api/auth/me').set('Cookie', cookie);
  expect(failedMeRes.statusCode).toBe(401);
});
