import 'reflect-metadata';

import { vi, describe, test, it, expect, beforeEach } from 'vitest';
import { AuthService } from '../auth.service';
import prisma from '../../prisma/__mocks__/prisma.service';
import { user, user_type } from '@prisma/client';
import { AuthController } from '../auth.controller';
import { Request, Response } from 'express';
import { BadRequestException } from '../../utils/errors';
import redis from '../../redis/__mocks__/redis.service';

const testUser: user = {
  user_id: 1,
  user_type_id: 2,
  email: 'test@my.bcit.ca',
  hashed_password: '$2a$12$mYKlYQwyz4rA7ojMiqSCseTXbZ3YQ6j4y/wpfsxtYto109Tijt2nq',
  first_name: 'test',
  last_name: 'test',
};

const regularUser: user = {
  user_id: 2,
  user_type_id: 1,
  email: 'test@my.bcit.ca',
  hashed_password: '$2a$12$mYKlYQwyz4rA7ojMiqSCseTXbZ3YQ6j4y/wpfsxtYto109Tijt2nq',
  first_name: 'test',
  last_name: 'test',
};

const adminUser: user = {
  user_id: 16,
  user_type_id: 2,
  email: 'jasonlui40@my.bcit.ca',
  hashed_password: '$2a$10$aP7vsjweB9VHe/a8338.hupLw9k/IC76WX9wAzdnXbFcMiR9hUTw2',
  first_name: 'Jason',
  last_name: 'Lui',
};

vi.mock('/src/prisma/prisma.service');
vi.mock('/src/redis/redis.service');
vi.mock('/src/utils/config.service', () => {
  const config = {
    string: vi.fn(),
  };

  return { config };
});
vi.mock('jsonwebtoken', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('jsonwebtoken')>()),
    sign: () => {},
    verify: () => ({ exp: 1000 }),
  };
});

describe('AuthController', () => {
  const auth = new AuthService(prisma, redis);
  const authController = new AuthController(auth);

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('auth service should be defined', () => {
    expect(auth).toBeDefined();
  });

  test('auth controller should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('login', () => {
    it('should have statusCode and message in response for regular user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(regularUser); // Use regular user data
      const response = { cookie: vi.fn() } as unknown as Response;

      const data = await authController.login({ email: regularUser.email, password: 'asd' }, response);

      expect(data).toHaveProperty('statusCode');
      expect(data).toHaveProperty('message');
    });

    it('should set the cookie if ok for regular user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(regularUser); // Use regular user data
      const response = { cookie: vi.fn() } as unknown as Response;

      await authController.login({ email: regularUser.email, password: 'asd' }, response);
      expect(response.cookie).toBeCalled();
    });

    it('should have statusCode and message in response for admin user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(adminUser); // Use admin user data
      const response = { cookie: vi.fn() } as unknown as Response;

      const data = await authController.login({ email: adminUser.email, password: '!A123456789' }, response);

      expect(data).toHaveProperty('statusCode');
      expect(data).toHaveProperty('message');
    });

    it('should set the cookie if ok for admin user', async () => {
      prisma.user.findUnique.mockResolvedValueOnce(adminUser); // Use admin user data
      const response = { cookie: vi.fn() } as unknown as Response;

      await authController.login({ email: adminUser.email, password: '!A123456789' }, response);
      expect(response.cookie).toBeCalled();
    });
  });

  describe('logout', () => {
    const token = 'token';
    it('should logout if token valid and not blacklisted', async () => {
      redis.blacklistToken.mockImplementationOnce(async (token: string) => {});

      const data = await authController.logout(token);

      expect(data).toHaveProperty('statusCode', 200);
      expect(data).toHaveProperty('message');
    });
  });

  describe('me', () => {
    const request = {
      user_id: testUser.user_id,
      email: testUser.email,
      first_name: testUser.first_name,
      last_name: testUser.last_name,
      user_type: 'admin',
    } as unknown as user & { user_type: user_type };
    it('should have statusCode and message in response', async () => {
      const data = await authController.me(request);
      expect(data).toHaveProperty('statusCode');
      expect(data).toHaveProperty('message');
    });

    it('should return user data if ok', async () => {
      const data = await authController.me(request);
      expect(data).toHaveProperty('user_id');
      expect(data).toHaveProperty('email');
      expect(data).toHaveProperty('first_name');
      expect(data).toHaveProperty('last_name');
      expect(data).toHaveProperty('user_type');
    });

    it('should response with bad request when no user', () => {
      const request = undefined as unknown as user & { user_type: user_type };

      expect(() => authController.me(request)).toThrowError(BadRequestException);
    });
  });
});
