import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ReportDto {
  @IsNumber()
  @IsNotEmpty()
  locationTagId: number;

  @IsString()
  @IsNotEmpty()
  subject: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  cloudinaryUrl: string;
}
