import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';

// WHERE TO WRITE THE QUERIES
@Service()
export class AdminService {
  private readonly prisma = Container.get(PrismaServce);

  public allUsers() {
    return this.prisma.user.findMany();
  }
}