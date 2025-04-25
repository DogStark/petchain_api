import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetModule } from './pet.module';
import { OwnerModule } from './owner.module';
import { VaccinationModule } from './vaccination.module';
import { Vet } from './vet.entity';

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
    TypeOrmModule.forFeature([Vet]),
    PetModule,
    OwnerModule,
    VaccinationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
