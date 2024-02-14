import Container, { Service } from 'typedi';
import { PrismaServce } from '../prisma/prisma.service';

@Service()
export class AppService {
  private readonly prisma = Container.get(PrismaServce);

  public welcome() {
    return 'Welcome!';
  }

  public greet(name: string) {
    return `Hello ${name}!`;
  }
}
