import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

function createUserTypes() {
  return prisma.user_type.createMany({
    data: [
      {
        user_type_id: 1,
        type: 'member',
      },
      {
        user_type_id: 2,
        type: 'admin',
      },
    ],
  });
}

function createStatuses() {
  return prisma.status.createMany({
    data: [
      {
        status_id: 1,
        status_type: 'unread',
      },
      {
        status_id: 2,
        status_type: 'resolved',
      },
      {
        status_id: 3,
        status_type: 'rejected',
      },
      {
        status_id: 4,
        status_type: 'in-progress',
      },
    ],
  });
}

function createLocationTags() {
  return prisma.location_tag.createMany({
    data: [
      {
        location_tag_id: 101,
        room: 323,
        building: 'SE12',
      },
      {
        location_tag_id: 102,
        room: 319,
        building: 'SE12',
      },
      {
        location_tag_id: 103,
        room: 301,
        building: 'SE12',
      },
      {
        location_tag_id: 104,
        room: 2590,
        building: 'SW01',
      },
    ],
  });
}

function createUsers() {
  return prisma.user.createMany({
    data: [
      {
        user_id: 1,
        email: 'test1@my.bcit.ca',
        first_name: 'test1',
        last_name: 'test1',
        hashed_password: '$2a$12$a0L..O/rfUBl50QMN0dZZeO0SciyraBNPVJFpj5n8Xqa9Y/HaNJF6',
        user_type_id: 1,
      },
      {
        user_id: 2,
        email: 'test2@my.bcit.ca',
        first_name: 'test2',
        last_name: 'test2',
        hashed_password: '$2a$12$bWjjDbKslgc5OixFR2FmFuhxjdt5KS44sVbmLjYwCSUVN2eWRSwtW',
        user_type_id: 1,
      },
      {
        user_id: 3,
        email: 'test3@my.bcit.ca',
        first_name: 'test3',
        last_name: 'test3',
        hashed_password: '$2a$12$l6kKK8lsnOxIl9U9bHbVy.Nb4CGhEESqIoa3XDIHY0a8korQyIiL2',
        user_type_id: 2,
      },
      {
        user_id: 4,
        email: 'test4@my.bcit.ca',
        first_name: 'test4',
        last_name: 'test4',
        hashed_password: '$2a$12$M/wSFuLdZx1ED5z5i7n0GeoRyIPoSB4MsntqY8moXcNVBXIaN.mPW',
        user_type_id: 2,
      },
    ],
  });
}

async function createImages() {
  await prisma.image.createMany({
    data: [
      {
        image_id: 1,
        cloudinary_id: 'https://res.cloudinary.com/dxp9ftmcw/image/upload/v1710213592/dhkqyxdwg3kuegdgvakb.jpg',
      },
    ],
  });

  return prisma.report_image.createMany({
    data: [
      {
        report_image_id: 1,
        report_id: 1,
        image_id: 1,
      },

      {
        report_image_id: 2,
        report_id: 2,
        image_id: 1,
      },
      {
        report_image_id: 3,
        report_id: 3,
        image_id: 1,
      },
    ],
  });
}

async function createReports() {
  return prisma.report.createMany({
    data: [
      {
        report_id: 1,
        title: 'Chair broken',
        description: 'Chair is broken',
        date_submitted: new Date(),
        location_tag_id: 101,
        user_id: 1,
        status_id: 1,
      },
      {
        report_id: 2,
        title: 'Table broken',
        description: 'Table is broken',
        date_submitted: new Date(),
        location_tag_id: 103,
        user_id: 1,
        status_id: 1,
      },
      {
        report_id: 3,
        title: 'TV broken',
        description: 'TV Broken',
        date_submitted: new Date(),
        location_tag_id: 102,
        user_id: 3,
        status_id: 2,
      },
    ],
  });
}

async function init() {
  console.log('🌱 Seeding Database...');
  await createUserTypes();
  await createStatuses();
  await createLocationTags();
  await createUsers();
  await createReports();
  await createImages();
  console.log('🌳 Seeding Finished!');
}

init();
