import { Controller, Get, Param } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from './user.service';

@Service()
@Controller('/user')
export class UserController {
  private readonly user = new UserService();

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
