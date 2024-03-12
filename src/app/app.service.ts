import { Service } from '../meta/routing.meta';

@Service()
export class AppService {
  public welcome() {
    return 'Welcome!';
  }

  public greet(name: string) {
    return `Hello ${name}!`;
  }
}
