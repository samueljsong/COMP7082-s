import { Service } from 'typedi';
import { PrismaService } from '../prisma/prisma.service';

// WHERE TO WRITE THE QUERIES
@Service()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public allUsers() {
    return this.prisma.user.findMany();
  }

  public async getUserReports(userId: number) {
    return this.prisma.report.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  public async getLocationTagById(locationTagId: number) {
    return this.prisma.location_tag.findUnique({
      where: {
        location_tag_id: locationTagId,
      },
    });
  }
}
