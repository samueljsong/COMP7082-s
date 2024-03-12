import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.user.deleteMany();

  await prisma.user.create({
    data: {
      email: 'aliu142@my.bcit.ca',
      hashed_password: '$2a$10$T5vbxdlbF9HSZoiZXF2dRO5jSkwwYFk5a231RreP1xpNCcu.Y8FXC',
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
      hashed_password: '$2a$10$ccFEcgJnGX6E3RNGw99BkeYZDiB4UVEa8IgFQAAFpYfHXY1/XKg5i',
      user_type_id: 2,
    },
  });
  await prisma.user.create({
    data: {
      email: 'wnguyen16@my.bcit.ca',
      hashed_password: '$2a$10$Wl.HB0pVu3K.ZNaX4Xhh9OHn6ajgs6B/V0lYeb5VoZbBrr1UkbGAi',
      user_type_id: 2,
    },
  });
}

async function fakeReports() {
  // Create location tags
  await prisma.location_tag.createMany({
    data: [
      { location_tag_id: 101, room: 101, building: 'Building A' },
      { location_tag_id: 102, room: 102, building: 'Building B' },
      { location_tag_id: 103, room: 103, building: 'Building A' },
      { location_tag_id: 104, room: 104, building: 'Building B' },
      // Add more location tags as needed
    ],
  });

  // Create reports
  await prisma.report.createMany({
    data: [
      {
        title: 'Active Report 1',
        description:
          'Description of active report 1 Description of active report 1 Description of active report 1 Description of active report 1 Description of active report 1',
        date_submitted: new Date('2024-03-04'),
        location_tag_id: 101,
        status_id: 1,
        user_id: 15,
      },
      {
        title: 'Active Report 2',
        description: 'Description of active report 2',
        date_submitted: new Date('2024-03-03'),
        location_tag_id: 102,
        status_id: 2,
        user_id: 15,
      },
      {
        title: 'Active Report 3',
        description: 'Description of active report 3',
        date_submitted: new Date('2024-03-04'),
        location_tag_id: 103,
        status_id: 3,
        user_id: 15,
      },
      {
        title: 'Active Report 4',
        description: 'Description of active report 4',
        date_submitted: new Date('2024-03-03'),
        location_tag_id: 104,
        status_id: 4,
        user_id: 15,
      },
      // Add more reports as needed
    ],
  });
}
async function cleanUp() {
  await prisma.report_image.deleteMany();
  await prisma.image.deleteMany();
  await prisma.report.deleteMany();
}
// seed();
// fakeReports();
cleanUp();
