import { PrismaClient } from '@prisma/client';
import { createClient } from 'redis';
import { beforeEach } from 'vitest';
import { config } from '../../utils/config.service';

const prisma = new PrismaClient();
const redis = createClient({
  socket: {
    host: config.string('REDIS_HOST'),
    port: config.int('REDIS_PORT'),
  },
});

async function resetDb() {
  await prisma.$transaction([prisma.report_image.deleteMany(), prisma.image.deleteMany(), prisma.report.deleteMany()]);
}

async function resetRedis() {
  await redis.connect();
  await redis.flushDb();
  await redis.disconnect();
}

beforeEach(async () => {
  await resetDb();
  await resetRedis();
});
