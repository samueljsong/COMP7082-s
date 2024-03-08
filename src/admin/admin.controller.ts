import { Controller, Get, Param } from 'routing-controllers';
import { Service } from 'typedi'
import { AdminService } from './admin.service';

// THIS IS FOR QUERYING ROUTES
@Service()
@Controller('/admin')
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

  @Get('/:locationTagId')
  async getLocationById(@Param('locationTagId') locationTagId: number) {
    return await this.admin.getLocationByIdAdmin(locationTagId);
  }
}
