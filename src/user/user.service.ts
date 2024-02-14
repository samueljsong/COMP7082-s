import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';

@Service()
export class UserService {
  private readonly prisma = Container.get(PrismaServce);

  public allUsers() {
    return this.prisma.user.findMany({ select: { email: true } });
  }
}
