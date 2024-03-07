import { Controller, Get, Param } from 'routing-controllers';
import { Service } from 'typedi'; // Import Service decorator
import { UserService } from './user.service';

// Register UserController as a service
@Service()
@Controller('/user')
export class UserController {
  private readonly user = new UserService(); // No need to use Container.get() if UserService is not registered as a service

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
