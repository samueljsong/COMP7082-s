import { Get } from 'routing-controllers';
import { AdminService } from './admin.service';
import { ServiceController } from '../meta/routing.meta';

@ServiceController('/admin')
export class AdminController {
  constructor(private readonly admin: AdminService) {}

  @Get('/all')
  all() {
    return this.admin.allUsers();
  }
}
