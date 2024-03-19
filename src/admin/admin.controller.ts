import { Get, Param, Patch } from 'routing-controllers';
import { AdminService } from './admin.service';
import { ServiceController } from '../meta/routing.meta';
import { inject } from 'tsyringe';

@ServiceController('/admin')
export class AdminController {
  constructor(@inject(AdminService) private readonly admin: AdminService) {}

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

  @Get('/:locationTagId')
  async getLocationById(@Param('locationTagId') locationTagId: number) {
    return await this.admin.getLocationByIdAdmin(locationTagId);
  }

  @Patch('/:reportId/change-state/:state')
  async updateReportState(@Param('reportId') reportId: number, @Param('state') state: number) {
    return await this.admin.updateReportStateAdmin(reportId, state);
  }
}
