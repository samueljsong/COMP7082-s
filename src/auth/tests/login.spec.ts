import App from '../../app';
import { AuthController } from '../auth.controller';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';

describe('POST /auth/login', () => {
  const app: App = new App([AuthController]);

  test('app should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('Login Route', () => {
    it('will return 404 with invalid email', async () => {
      const res = await request(app.server).post('/api/auth/login').send({ email: 'aliu142', password: 'asd' });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body.error).toBeDefined();
    });

    it('will return 404 with incorrect credentials', async () => {
      const res = await request(app.server)
        .post('/api/auth/login')
        .send({ email: 'aliu142@my.bcit.ca', password: 'aasd' });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body.error).toBeDefined();
    });

    it('will return 404 if user does not exist', async () => {
      const res = await request(app.server).post('/api/auth/login').send({ email: 'test@test.com', password: 'aasd' });

      expect(res.statusCode).toBe(StatusCodes.BAD_REQUEST);
      expect(res.body.error).toBeDefined();
    });
  });
});
