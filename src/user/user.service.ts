import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';

// WHERE TO WRITE THE QUERIES
@Service()
export class UserService {
  private readonly prisma = Container.get(PrismaServce);

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