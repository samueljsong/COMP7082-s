import { Service } from '../meta/routing.meta';
import { PrismaService } from '../prisma/prisma.service';
import { inject } from 'tsyringe';

// WHERE TO WRITE THE QUERIES
@Service()
export class AdminService {
  constructor(@inject(PrismaService) private readonly prisma: PrismaService) {}

  public allUsers() {
    return this.prisma.user.findMany();
  }

  public async getUserReportsAdmin(userId: number) {
    return this.prisma.report.findMany({
      where: {
        user_id: userId,
      },
    });
  }

  public async getUserReportAdmin(reportId: number) {
    return this.prisma.report.findUnique({
      where: {
        report_id: reportId,
      },
      include: {
        report_image: {
          include: {
            image: true,
          },
        },
      },
    });
  }

  public async getLocationByIdAdmin(locationTagId: number) {
    return this.prisma.location_tag.findUnique({
      where: {
        location_tag_id: locationTagId,
      },
    });
  }

  public async updateReportStateAdmin(reportId: number, state: number) {
    return this.prisma.report.update({
      where: {
        report_id: reportId,
      },
      data: {
        status_id: state,
      },
    });
  }
}
