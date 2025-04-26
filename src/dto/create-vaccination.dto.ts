import { IsString, IsNotEmpty, IsDate, IsInt, IsOptional, MinDate } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVaccinationDto {
  @IsString()
  @IsNotEmpty()
  vaccineName: string;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  @MinDate(new Date('2000-01-01'))
  dateAdministered: Date;

  @Type(() => Date)
  @IsDate()
  @IsNotEmpty()
  nextDueDate: Date;

  @IsInt()
  @IsNotEmpty()
  petId: number;

  @IsInt()
  @IsOptional()
  vetId?: number;
} 