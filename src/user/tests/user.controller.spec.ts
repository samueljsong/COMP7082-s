import 'reflect-metadata';
import { describe, it, expect, beforeEach } from 'vitest';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import prisma from '../../prisma/__mocks__/prisma.service';
import { user } from '@prisma/client';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;

  const fakeReport = {
    title: 'TESTING TITLE',
    date_submitted: new Date(),
    statusId: 1,
    locationTagId: 101,
    subject: 'TESTING SUBJECT',
    description: 'TESTINGING DESCRIPTION',
    image_id: 14,
    cloudinaryUrl: 'https://res.cloudinary.com/dxp9ftmcw/image/upload/v1709930592/orintjn3fxpkwbwtv9fp.png',
  };

  const adminUser: user = {
    user_id: 16,
    user_type_id: 2,
    email: 'jasonlui40@my.bcit.ca',
    hashed_password: '$2a$10$aP7vsjweB9VHe/a8338.hupLw9k/IC76WX9wAzdnXbFcMiR9hUTw2',
    new_user: false,
    first_name: 'Jason',
    last_name: 'Lui',
  };

  beforeEach(() => {
    userService = new UserService(prisma);
    controller = new UserController(userService);
  });

  it('should get location tag by id', async () => {
    const expected = {
      location_tag_id: 101,
      room: 323,
      building: 'SE12',
    };
    prisma.location_tag.findUnique.mockResolvedValueOnce(expected);
    const locationTagId = 101;
    const result = await controller.getLocationTagById(locationTagId);
    expect(result).toStrictEqual(expected);
  });

  it('should get all locations', async () => {
    const expected = [
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
    ];
    prisma.location_tag.findMany.mockResolvedValueOnce(expected);
    const result = await controller.allLocations();
    expect(result).toStrictEqual(expected);
  });

  it('should create a report', async () => {
    const expected = {
      statusCode: 200,
      message: 'Successfully created report',
    };

    const request = {
      user: {
        user_id: adminUser.user_id,
        email: adminUser.email,
        first_name: adminUser.first_name,
        last_name: adminUser.last_name,
        user_type: 'admin',
      },
    } as unknown as Request;
    prisma.report.create.mockResolvedValueOnce({
      report_id: 14,
      title: fakeReport.title,
      description: fakeReport.description,
      date_submitted: fakeReport.date_submitted,
      location_tag_id: fakeReport.locationTagId,
      status_id: fakeReport.statusId,
      user_id: adminUser.user_id,
    });

    prisma.image.create.mockResolvedValueOnce({
      image_id: 14,
      cloudinary_id: fakeReport.cloudinaryUrl,
    });

    prisma.report_image.create.mockResolvedValueOnce({
      report_id: 34,
      image_id: 14,
      report_image_id: 14,
    });

    const result = await controller.createUserReport(fakeReport, request);
    expect(result).toStrictEqual(expected);
  });

  it('should fail to create reports', async () => {
    const expected = {
      statusCode: 500,
      message: 'Failed to create report',
    };

    const request = {
      user: {
        user_id: adminUser.user_id,
        email: adminUser.email,
        first_name: adminUser.first_name,
        last_name: adminUser.last_name,
        user_type: 'admin',
      },
    } as unknown as Request;
    prisma.report.create.mockRejectedValueOnce(new Error('Failed to create report'));

    const result = await controller.createUserReport(fakeReport, request);
    expect(result).toStrictEqual(expected);
  });

  it('should get all users', async () => {
    const expected = [
      {
        user_id: 15,
        email: 'aliu142@my.bcit.ca',
        first_name: 'Alexander',
        last_name: 'Liu',
        hashed_password: '$2a$10$T5vbxdlbF9HSZoiZXF2dRO5jSkwwYFk5a231RreP1xpNCcu.Y8FXC',
        new_user: false,
        user_type_id: 2,
      },
      {
        user_id: 16,
        email: 'jasonlui40@my.bcit.ca',
        first_name: 'Jason',
        last_name: 'Lui',
        hashed_password: '$2a$10$aP7vsjweB9VHe/a8338.hupLw9k/IC76WX9wAzdnXbFcMiR9hUTw2',
        new_user: false,
        user_type_id: 2,
      },
      {
        user_id: 17,
        email: 'iguani@my.bcit.ca',
        first_name: 'Ian',
        last_name: 'Guani',
        hashed_password: '$2a$10$Rb7kq/IZ1UMsmlCe1SMjB.fAMMMGKboQzc.XSqXP1hI4WdV9ffx/6',
        new_user: false,
        user_type_id: 2,
      },
      {
        user_id: 18,
        email: 'jsong113@my.bcit.ca',
        first_name: 'Samuel',
        last_name: 'Song',
        hashed_password: '$2a$10$ccFEcgJnGX6E3RNGw99BkeYZDiB4UVEa8IgFQAAFpYfHXY1/XKg5i',
        new_user: false,
        user_type_id: 2,
      },
      {
        user_id: 19,
        email: 'wnguyen16@my.bcit.ca',
        first_name: 'Winston',
        last_name: 'Nguyen',
        hashed_password: '$2a$10$Wl.HB0pVu3K.ZNaX4Xhh9OHn6ajgs6B/V0lYeb5VoZbBrr1UkbGAi',
        new_user: false,
        user_type_id: 2,
      },
      {
        user_id: 20,
        email: 'user@my.bcit.ca',
        first_name: 'UserFirstname',
        last_name: 'UserLastName',
        hashed_password: '$2a$12$aAiTZ9ZZfqKtc8NmUq2erO9M5kS/zk6Zws2mnoRDUDj.mNJZanEaq',
        new_user: false,
        user_type_id: 1,
      },
    ];
    prisma.user.findMany.mockResolvedValueOnce(expected);
    const result = await controller.all();
    expect(result).toStrictEqual(expected);
  });

  it('should get user reports', async () => {
    const expected = [
      {
        report_id: 1,
        title: 'TESTING TITLE',
        description: 'TESTINGING DESCRIPTION',
        date_submitted: new Date(),
        status_id: 1,
        location_tag_id: 101,
        user_id: 16,
      },
    ];
    prisma.report.findMany.mockResolvedValueOnce(expected);
    const userId = 16;
    const result = await controller.getUserReports(userId);
    expect(result).toStrictEqual(expected);
  });
});
