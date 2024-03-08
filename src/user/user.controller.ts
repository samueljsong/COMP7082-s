import { UserService } from './user.service';
import { ServiceController } from '../meta/routing.meta';
import { Controller, Get, Post, Param, Body, Req, Res, Authorized} from 'routing-controllers';
import Container from 'typedi';
import { ReportDto } from './dtos/report.dto';

@ServiceController('/user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Authorized()
  @Get('/all')
  all() {
    return this.user.allUsers();
  }

  @Authorized()
  @Get('/:userId/reports')  
  async getUserReports(@Param('userId') userId: number) {
    return await this.user.getUserReports(userId);
  }

  @Authorized()
  @Get('/:locationTagId')
  async getLocationTagById(@Param('locationTagId') locationTagId: number) {
    return await this.user.getLocationTagById(locationTagId);
  }

  @Authorized()
  @Get('/all')
  async allLocations() {
    return this.user.allUsers();
  }

  @Authorized()
  @Post('/createReport')
  async createUserReport(@Body() dto: ReportDto, @Req() req: Request) {
    const userId = req['user'].user_id
    const success = await this.user.createUserReport(userId, dto.locationTagId, dto.subject, dto.description, dto.cloudinaryUrl);

    if (success == true) {
        return { statusCode: 200, message: 'Successfully created report' };
    }
    return { statusCode: 500, message: 'Failed to create report' };
  }

}
