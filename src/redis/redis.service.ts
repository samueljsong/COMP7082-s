import { createClient } from 'redis';
import { verify } from 'jsonwebtoken';
import { config } from '../utils/config.service';
import { UnauthorizedException } from '../utils/errors';
import { Service } from '../meta/routing.meta';

@Service({ scope: 'global' })
export class RedisService {
  private readonly client: ReturnType<typeof createClient>;

  constructor() {
    const redisClient = createClient({
      password: config.string('REDIS_PASSWORD'),
      socket: {
        host: config.string('REDIS_HOST'),
        port: config.int('REDIS_PORT'),
      },
    });
    this.client = redisClient;
    this.client
      .connect()
      .then(() => console.log('Redis client connected'))
      .catch((err) => console.log(err));
  }

  public async getValue(key: string) {
    const token = await this.client.get(key);
    return token;
  }

  public async blacklistToken(token: string) {
    let payload: any;
    try {
      payload = verify(token, config.string('JWT_SECRET'));
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const exp = payload.exp;

    const expiration = exp - Math.ceil(Date.now() / 1000);

    await this.client.set(token, expiration);
    await this.client.expire(token, expiration);
  }
}
