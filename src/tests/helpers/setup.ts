import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';

async function resetDb() {
  const prisma = new PrismaClient();

  await prisma.$transaction([prisma.report_image.deleteMany(), prisma.image.deleteMany(), prisma.report.deleteMany()]);
}

beforeEach(async () => {
  await resetDb();
});
