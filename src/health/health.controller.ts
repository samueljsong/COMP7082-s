import { Get } from 'routing-controllers';
import { HealthService } from './health.service';
import { ServiceController } from '../meta/routing.meta';
import { inject } from 'tsyringe';

@ServiceController('/health')
export class HealthController {
  constructor(@inject(HealthService) private readonly health: HealthService) {}

  @Get('')
  public ok() {
    return this.health.ok();
  }
}
