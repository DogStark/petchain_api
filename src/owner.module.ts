import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owner.entity';
import { OwnerController } from './owner.controller';
import { OwnerService } from './owner.service';
import { PetModule } from './pet.module';
import { Pet } from './pet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Owner, Pet]), PetModule],
  controllers: [OwnerController],
  providers: [OwnerService],
  exports: [TypeOrmModule],
})
export class OwnerModule {}
