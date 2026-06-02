import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Grass } from '../../grass/entities/grass.entity';
import { Reservation } from '../../reservations/entities/reservation.entity';

@Entity()
export class Field {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({ nullable: true })
  description!: string;

  @Column('decimal', { precision: 10, scale: 2 })
  pricePerHour!: number;

  @Column({ default: true })
  isActive!: boolean;

  @ManyToOne(() => Grass, (grass) => grass.fields)
  @JoinColumn({ name: 'grass_id' })
  grass!: Grass;

  @OneToMany(() => Reservation, (reservation) => reservation.field)
  reservations!: Reservation[];
}