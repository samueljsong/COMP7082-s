import Container from 'typedi';
import { AppService } from './app.service';
import { Controller, Get } from 'routing-controllers';

@Controller('')
export class AppController {
  private readonly app = Container.get(AppService);

  @Get('')
  public root() {
    return this.app.welcome();
  }

  // public root = handle((req: Request, res: Response) => {
  //   res.send(this.app.welcome());
  // });
}
