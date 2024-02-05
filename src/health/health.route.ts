import { Router } from 'express';
import { HealthController } from './health.controller';
import { Route } from '../utils/route';

export class HealthRoute implements Route {
  public readonly path: string = '/health';
  public readonly router = Router();
  public readonly exludePrefix = true;
  private readonly health = new HealthController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('', this.health.ok);
  }
}
