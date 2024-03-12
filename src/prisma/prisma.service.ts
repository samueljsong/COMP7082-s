import { PrismaClient } from '@prisma/client';
import { injectable } from 'tsyringe';

@injectable()
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
