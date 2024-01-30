import { PrismaClient } from '@prisma/client';

class PrismaServce extends PrismaClient {}

export const prisma = new PrismaServce();
