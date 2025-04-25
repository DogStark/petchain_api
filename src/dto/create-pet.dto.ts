import {
  IsString,
  IsInt,
  IsPositive,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreatePetDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  species: string;

  @IsString()
  @IsOptional()
  breed?: string;

  @IsString()
  @IsNotEmpty()
  gender: string;

  @IsInt()
  @IsPositive()
  age: number;

  @IsString()
  @IsOptional()
  microchipId?: string;

  @IsInt()
  @IsPositive()
  ownerId: number;
}
