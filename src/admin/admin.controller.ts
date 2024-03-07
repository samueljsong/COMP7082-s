import { Get, Param } from 'routing-controllers';
import { AdminService } from './admin.service';
import { ServiceController } from '../meta/routing.meta';

@ServiceController('/admin')
// THIS IS FOR QUERYING ROUTES
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('/all')
  all() {
    return this.admin.allUsers();
  }

  @Get('/:userId/reports')
  async getUserReports(@Param('userId') userId: number) {
    return await this.admin.getUserReportsAdmin(userId);
  }

  @Get('/:reportId/report')
  async getUserReport(@Param('reportId') reportId: number) {
    return await this.admin.getUserReportAdmin(reportId);
  }
}
