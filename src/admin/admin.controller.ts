import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi'; // Import Service decorator
import { AdminService } from './admin.service';

// Use both @Service() and @Controller() decorators
@Service()
@Controller('/admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('/all')
  all() {
    return this.admin.allUsers();
  }
}
