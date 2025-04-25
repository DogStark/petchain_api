import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateOwnerDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  phone: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsOptional()
  petIds?: number[];
}
