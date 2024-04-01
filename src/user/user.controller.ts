import { UserService } from './user.service';
import { ServiceController } from '../meta/routing.meta';
import { Get, Post, Param, Body, Req, Authorized, Patch } from 'routing-controllers';
import { ReportDto } from './dtos/report.dto';
import { inject } from 'tsyringe';
import { Role } from '../auth/auth.metadata';
import { user, user_type } from '@prisma/client';
import { User } from '../meta/user.meta';

@ServiceController('/user')
export class UserController {
  constructor(@inject(UserService) private readonly user: UserService) {}

  @Authorized(Role.ADMIN)
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

  @Authorized()
  @Get('/allLocations')
  async allLocations() {
    return await this.user.getAllLocationTags();
  }

  @Authorized()
  @Post('/createReport')
  async createUserReport(@Body() dto: ReportDto, @User() user: user & { user_type: user_type }) {
    const userId = user.user_id;
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

  @Authorized()
  @Patch('/updateNewUser')
  async updateNewUser(@Req() req: Request) {
    const current_user = req['user'] as user;
    await this.user.updateNewUser(current_user.email);
    return { status: 200, message: 'Successfully updated new_user' };
  }

  @Authorized()
  @Get('/isNewUser')
  async isNewUser(@Req() req: Request) {
    const current_user = req['user'] as user;
    return await this.user.isNewUser(current_user.email);
  }
}
