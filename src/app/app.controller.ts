import Container from 'typedi';
import { AppService } from './app.service';
import { handle } from '../utils/handle';
import { Request, Response } from 'express';

export class AppController {
  private readonly app = Container.get(AppService);

  public root = handle((req: Request, res: Response) => {
    res.send(this.app.welcome());
  });
}
