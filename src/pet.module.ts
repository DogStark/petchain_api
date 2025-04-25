import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { Owner } from './owner.entity';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Owner])],
  controllers: [PetController],
  providers: [PetService],
  exports: [TypeOrmModule, PetService],
})
export class PetModule {}
