import { AppService } from './app.service';
import { Get } from 'routing-controllers';
import { ServiceController } from '../meta/routing.meta';
import { inject } from 'tsyringe';

@ServiceController('')
export class AppController {
  constructor(@inject(AppService) private readonly app: AppService) {}

  @Get('')
  public root() {
    return this.app.welcome();
  }
}
