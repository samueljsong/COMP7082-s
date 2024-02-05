import { Router } from 'express';
import { Route } from '../utils/route';
import { AppController } from './app.controller';

export class AppRoute implements Route {
  public readonly path = '';
  public readonly router = Router();
  public readonly exludePrefix = false;
  private readonly app = new AppController();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes(): void {
    this.router.get('', this.app.root);
  }
}
