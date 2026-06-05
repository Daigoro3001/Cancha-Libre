import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Field } from '../../fields/entities/field.entity';
import { User } from '../../users/entities/user.entity';

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

  @ManyToOne(() => User, (user) => user.grasses, { nullable: true })
  @JoinColumn({ name: 'owner_id' })
  owner!: User;

  @OneToMany(() => Field, (field) => field.grass)
  fields!: Field[];
}