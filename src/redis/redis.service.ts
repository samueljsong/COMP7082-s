import { createClient } from 'redis';
import { JwtPayload, verify } from 'jsonwebtoken';
import { config } from '../utils/config.service';
import { BadRequestException, UnauthorizedException } from '../utils/errors';
import { Service } from '../meta/routing.meta';

@Service({ scope: 'global' })
export class RedisService {
  private readonly client: ReturnType<typeof createClient>;

  constructor() {
    const options: Parameters<typeof createClient>[0] = {
      socket: {
        host: config.string('REDIS_HOST'),
        port: config.int('REDIS_PORT'),
      },
    };

    /* v8 ignore next 3 */
    if (config.string('NODE_ENV') !== 'test') {
      options.password = config.string('REDIS_PASSWORD');
    }

    const redisClient = createClient(options);
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
    let payload: JwtPayload;

    try {
      payload = verify(token, config.string('JWT_SECRET')) as JwtPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }

    const exp = payload.exp;

    if (!exp) {
      throw new BadRequestException('Token missing exp property');
    }

    const expiration = exp - Math.ceil(Date.now() / 1000);

    await this.client.set(token, expiration);
    await this.client.expire(token, expiration);
  }
}
