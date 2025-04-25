import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vaccination } from './vaccination.entity';

@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  licenseNumber: string;

  @Column({ nullable: true })
  clinic: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  phone: string;

  @OneToMany(() => Vaccination, (vaccination) => vaccination.vet)
  vaccinations: Vaccination[];
} 