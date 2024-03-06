import { AppService } from './app.service';
import { Get } from 'routing-controllers';
import { ServiceController } from '../meta/routing.meta';

@ServiceController('')
export class AppController {
  constructor(private readonly app: AppService) {}

  @Get('')
  public root() {
    return this.app.welcome();
  }
}
