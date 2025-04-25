import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Owner } from './owner.entity';

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
}
