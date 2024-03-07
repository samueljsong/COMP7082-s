import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { RedisService } from '../redis.service';

beforeEach(() => {
  mockReset(redis);
});

const redis = mockDeep<RedisService>();
export default redis;
