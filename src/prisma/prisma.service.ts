import { PrismaClient } from '@prisma/client';
import { Service } from '../meta/routing.meta';

@Service({ scope: 'global' })
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }
}
