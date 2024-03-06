import { Get } from 'routing-controllers';
import { HealthService } from './health.service';
import { ServiceController } from '../meta/routing.meta';

@ServiceController('/health')
export class HealthController {
  constructor(private readonly health: HealthService) {}

  @Get('')
  public ok() {
    return this.health.ok();
  }
}
