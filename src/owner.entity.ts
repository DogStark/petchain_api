import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';
import { Notification } from './notification.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  address: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @OneToMany(() => Pet, pet => pet.owner)
  pets: Pet[];

  @OneToMany(() => Notification, notification => notification.owner)
  notifications: Notification[];
}
