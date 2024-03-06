import { Service } from 'typedi';
import { PrismaService } from '../prisma/prisma.service';

// WHERE TO WRITE THE QUERIES
@Service()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  public allUsers() {
    return this.prisma.user.findMany();
  }
}
