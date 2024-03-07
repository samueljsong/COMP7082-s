import { Service } from 'typedi';
import { PrismaService } from '../prisma/prisma.service';

// WHERE TO WRITE THE QUERIES
@Service()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

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
    return this.prisma.report.findMany({
      where: {
        report_id: reportId,
      },
    });
  }
}
