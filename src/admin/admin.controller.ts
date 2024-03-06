import { Controller, Get } from 'routing-controllers';
import { AdminService } from './admin.service';

// THIS IS FOR QUERYING ROUTES
@Controller('/admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('/all')
  all() {
    return this.admin.allUsers();
  }
}
