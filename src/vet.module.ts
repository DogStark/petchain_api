import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vet } from './vet.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vet])],
  exports: [TypeOrmModule],
})
export class VetModule {}
