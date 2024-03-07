import { HealthService } from './health.service';
import { beforeAll, describe, expect, it, test, vi } from 'vitest';

describe('Health [ /health ]', () => {
  const health = new HealthService();

  beforeAll(() => {
    vi.restoreAllMocks();
  });

  test('health should be defined', () => {
    expect(health).toBeDefined();
  });

  describe('ok', () => {
    it('should return ok', () => {
      const data = health.ok();

      expect(data).toEqual('ok');
    });
  });
});
