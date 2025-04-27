import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, Unique, OneToMany } from 'typeorm';
import { Owner } from './owner.entity';
import { Pet } from './pet.entity';
import { Vet } from './vet.entity';


@Entity()
@Unique(['vetId', 'date', 'time']) // Prevents double-booking
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reason: string;

  @Column()
  date: string;

  @Column()
  time: string;

  @Column()
  petId: number;

  @Column()
  ownerId: number;

  @Column()
  vetId: number;

  @Column({ default: false })
  notification: boolean;

  @ManyToOne(() => Owner, (owner) => owner.appointments, { eager: true })
  owner: Owner;

  @ManyToOne(() => Pet, (pet) => pet.appointments, { eager: true })
  pet: Pet;

  @ManyToOne(() => Vet, (vet) => vet.appointments, { eager: true })
  vet: Vet;
  
}


