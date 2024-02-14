import { Controller, Get } from 'routing-controllers';
import Container from 'typedi';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  private readonly user = Container.get(UserService);

  @Get('/all')
  all() {
    return this.user.allUsers();
  }
}
