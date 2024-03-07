import { Get, Param } from 'routing-controllers';
import { UserService } from './user.service';
import { ServiceController } from '../meta/routing.meta';

@ServiceController('/user')
export class UserController {
  constructor(private readonly user: UserService) {}

  @Get('/all')
  all() {
    return this.user.allUsers();
  }

  @Get('/:userId/reports')
  async getUserReports(@Param('userId') userId: number) {
    return await this.user.getUserReports(userId);
  }

  @Get('/:locationTagId')
  async getLocationTagById(@Param('locationTagId') locationTagId: number) {
    return await this.user.getLocationTagById(locationTagId);
  }
}
