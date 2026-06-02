import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Field } from '../../fields/entities/field.entity';

@Entity()
export class Grass {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  address!: string;

  @Column()
  phone!: string;

  @Column({ nullable: true })
  description!: string;

  @OneToMany(() => Field, (field) => field.grass)
  fields!: Field[];
}