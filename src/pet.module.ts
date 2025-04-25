import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pet.entity';
import { Owner } from './owner.entity';
import { PetController } from './pet.controller';
import { PetService } from './pet.service';
import { PdfService } from './pdf.service';

@Module({
  imports: [TypeOrmModule.forFeature([Pet, Owner])],
  controllers: [PetController],
  providers: [PetService, PdfService],
  exports: [TypeOrmModule, PetService, PdfService],
})
export class PetModule {}
