import 'reflect-metadata';
import { describe, it, expect, beforeEach } from 'vitest';
import { AdminController } from '../admin.controller';
import { AdminService } from '../admin.service';
import prisma from '../../prisma/__mocks__/prisma.service';

describe('AdminController', () => {
  let controller: AdminController;
  let adminService: AdminService;

  beforeEach(() => {
    adminService = new AdminService(prisma);
    controller = new AdminController(adminService);
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

  it('should get all the reports of a specified user', async () => {
    const userId = 15;
    const expected = [
      {
        report_id: 17,
        title: 'JASON',
        description: 'TESTING CLOUD LINK',
        date_submitted: new Date('2024-03-07T23:18:07.000Z'),
        location_tag_id: 101,
        status_id: 4,
        user_id: 15,
      },
      {
        report_id: 18,
        title: 'DEFAUKLT',
        description: 'TESTING WINSTON FACE',
        date_submitted: new Date('2024-03-07T23:19:03.000Z'),
        location_tag_id: 101,
        status_id: 1,
        user_id: 15,
      },
      {
        report_id: 33,
        title: 'TESTING SUBJECT',
        description: 'TESTINGING DESCRIPTION',
        date_submitted: new Date('2024-03-09T03:19:10.000Z'),
        location_tag_id: 101,
        status_id: 1,
        user_id: 15,
      },
      {
        report_id: 34,
        title: 'TESTING SUBJECT',
        description: 'TESTINGING DESCRIPTION',
        date_submitted: new Date('2024-03-10T00:02:31.000Z'),
        location_tag_id: 101,
        status_id: 2,
        user_id: 15,
      },
    ];
    prisma.report.findMany.mockResolvedValueOnce(expected);
    const result = await controller.getUserReports(userId);
    expect(result).toStrictEqual(expected);
  });

  it('should get a single user report', async () => {
    const reportId = 34;
    const expected = {
      report_id: 34,
      title: 'TESTING SUBJECT',
      description: 'TESTINGING DESCRIPTION',
      date_submitted: new Date('2024-03-09T03:19:10.000Z'),
      location_tag_id: 101,
      status_id: 2,
      user_id: 15,
      report_image: [
        {
          report_image_id: 14,
          report_id: 34,
          image_id: 14,
          image: {
            image_id: 14,
            cloudinary_id: 'https://res.cloudinary.com/dxp9ftmcw/image/upload/v1709930592/orintjn3fxpkwbwtv9fp.png',
          },
        },
      ],
    };
    prisma.report.findUnique.mockResolvedValueOnce(expected);
    const result = await controller.getUserReport(reportId);
    expect(result).toStrictEqual(expected);
  });

  it('should get the location by the location ID', async () => {
    const expected = {
      location_tag_id: 101,
      room: 323,
      building: 'SE12',
    };
    prisma.location_tag.findUnique.mockResolvedValueOnce(expected);
    const locationTagId = 101;
    const result = await controller.getLocationById(locationTagId);
    expect(result).toStrictEqual(expected);
  });

  it('should change the status of the report', async () => {
    const expected = {
      report_id: 34,
      title: 'TESTING SUBJECT',
      description: 'TESTINGING DESCRIPTION',
      date_submitted: new Date('2024-03-09T03:19:10.000Z'),
      location_tag_id: 101,
      status_id: 2,
      user_id: 15,
    };
    prisma.report.update.mockResolvedValueOnce(expected);
    const reportId = 34;
    const state = 2;
    const result = await controller.updateReportState(reportId, state);
    expect(result).toStrictEqual(expected);
  });
  it('should prevent SQL injection when attempting to drop table', async () => {
    const userId: any = "1; DROP TABLE reports; --";
    const expected: { report_id: number; title: string; description: string; date_submitted: Date; location_tag_id: number; status_id: number; user_id: number; }[] = [];
    prisma.report.findMany.mockResolvedValueOnce(expected);
    // eslint-disable-next-line
    const result = await controller.getUserReports(userId);
    expect(result).toStrictEqual(expected);
  });
  
  it('should prevent SQL injection when attempting to retrieve unauthorized data', async () => {
    const reportId: any = "2'; DROP TABLE reports; --";
    const expected: { report_id: number; title: string; description: string; date_submitted: Date; location_tag_id: number; status_id: number; user_id: number; } | null = null;
    prisma.report.findUnique.mockResolvedValueOnce(expected);
    // eslint-disable-next-line
    const result = await controller.getUserReport(reportId);
    expect(result).toStrictEqual(expected);
  });
  
  it('should prevent SQL injection when attempting to bypass authentication', async () => {
    const userId: any = "' OR '1'='1";
    const expected: { report_id: number; title: string; description: string; date_submitted: Date; location_tag_id: number; status_id: number; user_id: number; }[] = [];
    prisma.report.findMany.mockResolvedValueOnce(expected);
    // eslint-disable-next-line
    const result: any = await controller.getUserReports(userId);
    expect(result).toStrictEqual(expected);
  });  
  
});
