import { AdminService } from './admin.service';
import { ServiceController } from '../meta/routing.meta';
import { Get, Param, Authorized, Patch } from 'routing-controllers';
import { inject } from 'tsyringe';
import { Role } from '../auth/auth.metadata';


@ServiceController('/admin')
export class AdminController {
  constructor(@inject(AdminService) private readonly admin: AdminService) {}
  
  @Authorized(Role.ADMIN)
  @Get('/all')
  all() {
    return this.admin.allUsers();
  }

  @Authorized(Role.ADMIN)
  @Get('/:userId/reports')
  async getUserReports(@Param('userId') userId: number) {
    return await this.admin.getUserReportsAdmin(userId);
  }

  @Authorized(Role.ADMIN)
  @Get('/:reportId/report')
  async getUserReport(@Param('reportId') reportId: number) {
    return await this.admin.getUserReportAdmin(reportId);
  }

  @Authorized(Role.ADMIN)
  @Get('/:locationTagId')
  async getLocationById(@Param('locationTagId') locationTagId: number) {
    return await this.admin.getLocationByIdAdmin(locationTagId);
  }

  @Authorized(Role.ADMIN)
  @Patch('/:reportId/change-state/:state')
  async updateReportState(@Param('reportId') reportId: number, @Param('state') state: number) {
    return await this.admin.updateReportStateAdmin(reportId, state);
  }
}
