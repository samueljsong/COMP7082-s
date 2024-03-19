import 'reflect-metadata'; // have to add this to the top of every test file
import { describe, expect, beforeAll, it, vi, test } from 'vitest';
import { AppService } from './app.service';

describe('GET /api', () => {
  const app = new AppService();

  beforeAll(() => {
    vi.restoreAllMocks();
  });

  test('app service should be defined', () => {
    expect(app).toBeDefined();
  });

  describe('welcome', () => {
    it('should return Welcome!', () => {
      const data = app.welcome();

      expect(data).toEqual('Welcome!');
    });
  });

  describe('greet', () => {
    it('should return greeting with provided name', () => {
      const name = 'alex';
      const data = app.greet(name);

      expect(data).toContain(name);
      expect(data).toEqual(`Hello ${name}!`);
    });
  });
});
