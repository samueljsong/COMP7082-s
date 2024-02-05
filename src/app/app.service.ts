import { Service } from 'typedi';

@Service()
export class AppService {
  public welcome() {
    return 'Welcome!';
  }

  public greet(name: string) {
    return `Hello ${name}!`;
  }
}
