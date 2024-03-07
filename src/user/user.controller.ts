import { Controller, Get, Post, Param } from 'routing-controllers';
import Container from 'typedi';
import { UserService } from './user.service';

// THIS IS FOR QUERYING ROUTES 
@Controller('/user')
export class UserController {
  private readonly user = Container.get(UserService);

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

  @Post('/createReport')
  async createUserReport(@Param('userId') userId: number) {

  }

}