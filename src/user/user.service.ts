import { Service } from 'typedi';
import { PrismaService } from '../prisma/prisma.service';

// WHERE TO WRITE THE QUERIES
@Service()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  public allUsers() {
    return this.prisma.user.findMany();
  }

  public async getUserReports(userId: number) {
    return this.prisma.report.findMany({
      where: {
        user_id: userId,
      },
      include: {
        report_image: {
          include: {
            image: true,
          }
        }
      }
    });
  }

  public async getLocationTagById(locationTagId: number) {
    return this.prisma.location_tag.findUnique({
      where: {
        location_tag_id: locationTagId,
      },
    });
  }

  public async getAllLocationTags() {
    return this.prisma.location_tag.findMany();
  }

  public async createUserReport(user_id: number, location_tag_id: number, title: string, description: string, imageTag: string): Promise<boolean> {
    try {
        const date_submitted = new Date();
        const status_id = 1; // Unread Status Code
        const report = await this.prisma.report.create(
            {
                data: {
                    title,
                    description,
                    date_submitted,
                    location_tag_id,
                    status_id,
                    user_id
                }
            }
        )

        // If user adds an image => create image + report_image entries
        if (imageTag != '') {
            const report_id = report.report_id;
            const cloudinary_id = imageTag;
            const image = await this.prisma.image.create({
                data: {
                    cloudinary_id
                }
            })
            const image_id = image.image_id;
            const report_image = await this.prisma.report_image.create(
                {
                    data: {
                        report_id,
                        image_id
                    }
                }
            )
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
  } 
}
