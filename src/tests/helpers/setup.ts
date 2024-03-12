import { PrismaClient } from '@prisma/client';
import { beforeEach } from 'vitest';

const prisma = new PrismaClient();

async function resetDb() {
  await prisma.$transaction([prisma.report_image.deleteMany(), prisma.image.deleteMany(), prisma.report.deleteMany()]);
}

beforeEach(async () => {
  await resetDb();
});
