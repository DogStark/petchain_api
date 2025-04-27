import { Module } from '@nestjs/common';
import { AuthModule } from './auth.module';
import { RbacExampleController } from './rbac-example.controller';
import { RolesGuard } from './roles.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet.module';
import { OwnerModule } from './owner.module';
import { TreatmentHistoryModule } from './treatment-history.module';
import { VetModule } from './vet.module';
import { VaccinationModule } from './vaccination.module';
import { AppointmentModule } from './appointment.module';
import { VetService } from './vet.service';
import { VetController } from './vet.controller';

@Module({
  imports: [
    AuthModule,
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
    AppointmentModule,
  ],
  controllers: [AppController, RbacExampleController, VetController],
  providers: [AppService, RolesGuard, VetService],
})
export class AppModule {}
