import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { config } from './config.service';
import { InternalServerError } from 'routing-controllers';

describe('config service', () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    process.env = { JWT_SECRET: 'verysecret' };
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it('should return value when key and value are correct', () => {
    const secret = config.string('JWT_SECRET');

    expect(secret).toBe('verysecret');
  });

  it('should throw 500 when env variable not found', () => {
    expect(() => config.string('API_KEY')).toThrowError(InternalServerError);
    expect(() => config.string('API_KEY')).toThrowError(/env variable.*does not exist/i);
  });

  it('should throw 500 when failed to parse to integer', () => {
    expect(() => config.int('JWT_SECRET')).toThrowError(InternalServerError);
    expect(() => config.int('JWT_SECRET')).toThrowError(/cannot be parsed into an integer/i);
  });
});
