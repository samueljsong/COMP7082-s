import { describe, it, expect, beforeEach } from 'vitest';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import prisma from '../../prisma/__mocks__/prisma.service';

describe('UserController', () => {
    let controller: UserController;
    let userService: UserService;

    // const fakeReport = {
    //     locationTagId: 101,
    //     subject: "TESTING SUBJECT",
    //     description: "TESTINGING DESCRIPTION",
    //     cloudinaryUrl: "https://res.cloudinary.com/dxp9ftmcw/image/upload/v1709930592/orintjn3fxpkwbwtv9fp.png"
    // }

    beforeEach(() => {
        userService = new UserService(prisma);
        controller = new UserController(userService);
    });

    it('should get location tag by id', async () => {
        const expected = {
            "location_tag_id": 101,
            "room": 323,
            "building": "SE12"
        };
        prisma.location_tag.findUnique.mockResolvedValueOnce(expected);
        const locationTagId = 101;
        const result = await controller.getLocationTagById(locationTagId);
        expect(result).toStrictEqual(expected);
    });

    it('should get all locations', async () => {
        const expected = [
            {
                "location_tag_id": 101,
                "room": 323,
                "building": "SE12"
            },
            {
                "location_tag_id": 102,
                "room": 319,
                "building": "SE12"
            },
            {
                "location_tag_id": 103,
                "room": 301,
                "building": "SE12"
            },
            {
                "location_tag_id": 104,
                "room": 2590,
                "building": "SW01"
            }
        ];
        prisma.location_tag.findMany.mockResolvedValueOnce(expected);
        const result = await controller.allLocations();
        expect(result).toStrictEqual(expected);
    });

    // it('should create a report', async () => {
    //     const result = await controller.createUserReport(fakeReport, );
    //     expect(result).toBe(true);
    // });

});
