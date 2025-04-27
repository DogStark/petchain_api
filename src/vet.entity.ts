import { Entity, Column, PrimaryGeneratedColumn, OneToMany, OneToOne, JoinColumn } from 'typeorm';
import { TreatmentHistory } from './treatment-history.entity';
import { Vaccination } from './vaccination.entity';
import { User } from './user.entity';

@Entity()
export class Vet {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, user => user.vetProfile)
  @JoinColumn()
  user: User;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  specialization: string;

  @Column()
  licenseNumber: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => TreatmentHistory, (treatment) => treatment.vet)
  treatments: TreatmentHistory[];

  @Column({ nullable: true })
  clinic: string;

  @OneToMany(() => Vaccination, (vaccination) => vaccination.vet)
  vaccinations: Vaccination[];
}
