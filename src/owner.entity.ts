import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Pet } from './pet.entity';

@Entity()
export class Owner {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Pet, (pet) => pet.owner)
  pets: Pet[];
}
