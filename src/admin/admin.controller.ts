import { Controller, Get } from 'routing-controllers';
import { Service } from 'typedi';
import { AdminService } from './admin.service';

@Service()
@Controller('/admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('/all')
  all() {
    return this.admin.allUsers();
  }
}
