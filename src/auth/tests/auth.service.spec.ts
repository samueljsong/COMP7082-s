import 'reflect-metadata';
import 'dotenv/config';

import { vi, describe, test, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../auth.service';
import { RedisService } from '../../redis/redis.service';
import prisma from '../../prisma/__mocks__/prisma.service';
import { user } from '@prisma/client';

const testUser: user = {
  user_id: 1,
  user_type_id: 2,
  email: 'test@my.bcit.ca',
  hashed_password: '$2a$12$mYKlYQwyz4rA7ojMiqSCseTXbZ3YQ6j4y/wpfsxtYto109Tijt2nq',
  first_name: 'test',
  last_name: 'test',
};

vi.mock('/src/prisma/prisma.service');

describe('AuthService', () => {
  const auth = new AuthService(prisma, new RedisService());

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('auth service should be defined', () => {
    expect(auth).toBeDefined();
  });

  describe('login', () => {
    it('will throw bad request when user not found', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(null);

      await expect(() => auth.login('test@my.bcit.ca', '123')).rejects.toThrowError('User does not exist');
    });

    it('will throw bad request when credentials do not match', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(testUser);

      await expect(() => auth.login('test@my.bcit.ca', '12345')).rejects.toThrowError('Invalid credentials');
    });

    it('will return token if credentials are ok', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(testUser);

      const token = await auth.login('test@my.bcit.ca', 'asd');

      expect(token).not.toBe('');
    });
  });
});
