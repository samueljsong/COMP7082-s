import Container from 'typedi';
import { HealthService } from './health.service';
import { Request, Response } from 'express';
import { handle } from '../utils/handle';

export class HealthController {
  private readonly health = Container.get(HealthService);

  public ok = handle((req: Request, res: Response) => {
    res.send(this.health.ok());
  });
}
