import { beforeEach } from 'vitest';
import { mockDeep, mockReset } from 'vitest-mock-extended';
import { PrismaService } from '../prisma.service';

beforeEach(() => {
  mockReset(prisma);
});

const prisma = mockDeep<PrismaService>();
export default prisma;
