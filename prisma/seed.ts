import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'aliu142@my.bcit.ca',
      hashed_password: '$2a$10$zG3UaGgMJmDFQeForLkCIOwAZyWs4dhVyj5Wp1c8sig.V2gpCPlLm',
      user_type_id: 2,
    },
  });
  await prisma.user.create({
    data: {
      email: 'jasonlui40@my.bcit.ca',
      hashed_password: '$2a$10$aP7vsjweB9VHe/a8338.hupLw9k/IC76WX9wAzdnXbFcMiR9hUTw2',
      user_type_id: 2,
    },
  });
  await prisma.user.create({
    data: {
      email: 'iguani@my.bcit.ca',
      hashed_password: '$2a$10$Rb7kq/IZ1UMsmlCe1SMjB.fAMMMGKboQzc.XSqXP1hI4WdV9ffx/6',
      user_type_id: 2,
    },
  });
  await prisma.user.create({
    data: {
      email: 'jsong113@my.bcit.ca',
      hashed_password: '$2a$10$CrZzm/jcwCcM/KlvYAGJZe66FObBqn0Aysn9qu2EgrEUL1t7OhkGe',
      user_type_id: 2,
    },
  });
  await prisma.user.create({
    data: {
      email: 'wnguyen@16@my.bcit.ca',
      hashed_password: '$2a$10$Wl.HB0pVu3K.ZNaX4Xhh9OHn6ajgs6B/V0lYeb5VoZbBrr1UkbGAi',
      user_type_id: 2,
    },
  });
}

seed();
