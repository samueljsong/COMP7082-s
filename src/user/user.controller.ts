import { UserService } from './user.service';
import { ServiceController } from '../meta/routing.meta';
import { Get, Post, Param, Body, Req, Authorized } from 'routing-controllers';
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
  @Get('/locationTagIds/:locationTagId')
  async getLocationTagById(@Param('locationTagId') locationTagId: number) {
    return await this.user.getLocationTagById(locationTagId);
  }

  @Post('/createReport')
  async createUserReport(@Param('userId') userId: number) {}
}
  @Authorized()
  @Get('/allLocations')
  async allLocations() {
    return await this.user.getAllLocationTags();
  }

  @Authorized()
  @Post('/createReport')
  async createUserReport(@Body() dto: ReportDto, @Req() req: Request) {
    const userId = req['user'].user_id;
    const success = await this.user.createUserReport(
      userId,
      dto.locationTagId,
      dto.subject,
      dto.description,
      dto.cloudinaryUrl,
    );

    if (success == true) {
      return { statusCode: 200, message: 'Successfully created report' };
    }
    return { statusCode: 500, message: 'Failed to create report' };
  }
}
