import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VaccinationController } from './vaccination.controller';
import { VaccinationService } from './vaccination.service';
import { Vaccination } from './vaccination.entity';
import { Pet } from './pet.entity';
import { Vet } from './vet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccination, Pet, Vet])],
  controllers: [VaccinationController],
  providers: [VaccinationService],
  exports: [VaccinationService],
})
export class VaccinationModule {} 