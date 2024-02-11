import { PrismaClient } from '@prisma/client';
import { Service } from 'typedi';

@Service()
export class PrismaServce extends PrismaClient {
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
