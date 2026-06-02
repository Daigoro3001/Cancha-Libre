import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn } from 'typeorm';
import { Field } from '../../fields/entities/field.entity';

@Entity()
export class Reservation {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'date' })
  date!: string;

  @Column({ type: 'time' })
  startTime!: string;

  @Column({ type: 'time' })
  endTime!: string;

  @Column({ default: 'reserved' })
  status!: string;

  @Column()
  clientName!: string;

  @Column({ nullable: true })
  clientPhone!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Field, (field) => field.reservations)
  @JoinColumn({ name: 'field_id' })
  field!: Field;
}