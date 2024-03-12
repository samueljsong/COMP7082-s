import { BadRequestException } from '../utils/errors';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { user, user_type } from '@prisma/client';
import { RedisService } from '../redis/redis.service';
import { PrismaService } from '../prisma/prisma.service';
import { config } from '../utils/config.service';
import { inject } from 'tsyringe';
import { Service } from '../meta/routing.meta';

@Service()
export class AuthService {
  constructor(
    @inject(PrismaService) private readonly prisma: PrismaService,
    @inject(RedisService) private readonly redis: RedisService,
  ) {}

  public async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, include: { user_type: true } });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const ok = compareSync(password, user.hashed_password);
    if (!ok) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = sign(user, config.string('JWT_SECRET'), { expiresIn: '1h' });

    return token;
  }

  public async logout(token: string) {
    return await this.redis.blacklistToken(token);
  }

  public me(user: user & { user_type: user_type; first_name: string; last_name: string }) {
    if (!user) {
      throw new BadRequestException('No user in request');
    }

    return {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_type: user.user_type.type,
    };
  }
}
