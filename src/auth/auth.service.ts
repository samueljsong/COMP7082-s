import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';
import { BadRequestException } from '../utils/errors';
import { compareSync } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { user, user_type } from '@prisma/client';
import { RedisService } from '../redis/redis.service';

@Service()
export class AuthService {
  private readonly prisma = Container.get(PrismaServce);
  private readonly redis = Container.get(RedisService);

  public async login(email: string, password: string) {
    const user = await this.prisma.user.findUnique({ where: { email }, include: { user_type: true } });

    if (!user) {
      throw new BadRequestException('User does not exist');
    }

    const ok = compareSync(password, user.hashed_password);
    if (!ok) {
      throw new BadRequestException('Invalid credentials');
    }

    const token = sign(user, process.env.JWT_SECRET!, { expiresIn: '1h' });

    return token;
  }

  public async logout(token: string) {
    return await this.redis.blacklistToken(token);
  }

  public me(user: user & { user_type: user_type }) {
    return {
      user_id: user.user_id,
      email: user.email,
      first_name: user.first_name,
      last_name: user.last_name,
      user_type: user.user_type.type,
    };
  }
}
