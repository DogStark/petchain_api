import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Owner } from './owner.entity';
import { Vaccination } from './vaccination.entity';
import { Notification } from './notification.entity';

@Entity()
export class Pet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  species: string;

  @Column({ nullable: true })
  breed: string;

  @Column()
  gender: string;

  @Column('int')
  age: number;

  @Column({ nullable: true })
  microchipId: string;

  @ManyToOne(() => Owner, (owner) => owner.pets, {
    eager: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'ownerId' })
  owner: Owner;

  @Column()
  ownerId: number;

  @OneToMany(() => Vaccination, (vaccination) => vaccination.pet)
  vaccinations: Vaccination[];

  @OneToMany(() => Notification, notification => notification.pet)
  notifications: Notification[];
}
