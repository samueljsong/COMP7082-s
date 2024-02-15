import { Controller, Get } from 'routing-controllers';
import Container from 'typedi';
import { AdminService } from './admin.service';

// THIS IS FOR QUERYING ROUTES 
@Controller('/admin')
export class UserController {
  private readonly admin = Container.get(AdminService);

  @Get('/all')
  all() {
    return this.admin.allUsers();
  }
}