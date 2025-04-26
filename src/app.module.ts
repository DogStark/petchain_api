import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet.module';
import { OwnerModule } from './owner.module';
import { TreatmentHistoryModule } from './treatment-history.module';
import { VetModule } from './vet.module';
import { VaccinationModule } from './vaccination.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'your_username',
      password: 'your_password',
      database: 'petchain',
      synchronize: true,
      autoLoadEntities: true,
    }),
    PetModule,
    OwnerModule,
    TreatmentHistoryModule,
    VetModule,
    VaccinationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
