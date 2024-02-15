import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '../utils/errors';
import { compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../utils/env';
import { user, user_type } from '@prisma/client';

@Service()
export class AuthService {
  private readonly prisma = Container.get(PrismaServce);

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

  public me(token: string) {
    try {
      const payload = verify(token, config.get('JWT_SECRET'));

      return {
        user_id: payload.user_id,
        email: payload.email,
        first_name: payload.first_name,
        last_name: payload.last_name,
        user_type: payload.user_type.type,
      };
    } catch (err) {
      throw new UnauthorizedException('Not logged in');
    }
  }
}
