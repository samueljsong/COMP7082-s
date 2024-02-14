import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';
import { BadRequestException, UnauthorizedException } from '../utils/errors';
import { compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';

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
      const user = verify(token, process.env.JWT_SECRET!);

      delete user['hashed_password'];
      delete user['iat'];
      delete user['exp'];
      delete user['user_type_id'];

      return { user_id: user.user_id, email: user.email, user_type: user.user_type.type };
    } catch (err) {
      throw new UnauthorizedException('Not logged in');
    }
  }
}
