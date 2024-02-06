import { Controller, Get } from 'routing-controllers';
import Container from 'typedi';
import { HealthService } from './health.service';

@Controller('/health')
export class HealthController {
  private readonly health = Container.get(HealthService);

  @Get('')
  public ok() {
    return this.health.ok();
  }

  // public ok = handle((req: Request, res: Response) => {
  //   res.send(this.health.ok());
  // });
}
