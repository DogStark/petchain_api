import { IsString, IsOptional, IsDate, IsInt, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateVaccinationDto {
  @IsString()
  @IsOptional()
  vaccineName?: string;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  @MinDate(new Date('2000-01-01'))
  dateAdministered?: Date;

  @Type(() => Date)
  @IsDate()
  @IsOptional()
  nextDueDate?: Date;

  @IsInt()
  @IsOptional()
  vetId?: number;
} 