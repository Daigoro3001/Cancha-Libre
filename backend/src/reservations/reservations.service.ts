import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Reservation } from './entities/reservation.entity';
import { CreateReservationDto } from './dto/create-reservation.dto';
import { UpdateReservationDto } from './dto/update-reservation.dto';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectRepository(Reservation)
    private readonly reservationRepository: Repository<Reservation>,
  ) {}

  async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
    const { fieldId, ...rest } = createReservationDto;

    const conflict = await this.reservationRepository
      .createQueryBuilder('reservation')
      .where('reservation.field_id = :fieldId', { fieldId })
      .andWhere('reservation.date = :date', { date: rest.date })
      .andWhere('reservation.startTime < :endTime', { endTime: rest.endTime })
      .andWhere('reservation.endTime > :startTime', { startTime: rest.startTime })
      .getOne();

    if (conflict) {
      throw new BadRequestException('Ya existe una reserva en ese horario para esta cancha');
    }

    const reservation = this.reservationRepository.create({
      ...rest,
      field: { id: fieldId },
    });
    return await this.reservationRepository.save(reservation);
  }

  async findAll(): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      relations: ['field', 'field.grass'],
    });
  }

  async findByField(fieldId: number): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: { field: { id: fieldId } },
      relations: ['field'],
    });
  }

  async findByFieldAndDate(fieldId: number, date: string): Promise<Reservation[]> {
    return await this.reservationRepository.find({
      where: { field: { id: fieldId }, date },
      relations: ['field'],
    });
  }

  async findOne(id: number): Promise<Reservation> {
    const reservation = await this.reservationRepository.findOne({
      where: { id },
      relations: ['field', 'field.grass'],
    });
    if (!reservation) {
      throw new NotFoundException(`Reserva con id ${id} no encontrada`);
    }
    return reservation;
  }

  async update(id: number, updateReservationDto: UpdateReservationDto): Promise<Reservation> {
    const reservation = await this.findOne(id);
    const { fieldId, ...rest } = updateReservationDto;
    Object.assign(reservation, rest);
    if (fieldId) {
      reservation.field = { id: fieldId } as any;
    }
    return await this.reservationRepository.save(reservation);
  }

  async remove(id: number): Promise<{ message: string }> {
    const reservation = await this.findOne(id);
    await this.reservationRepository.remove(reservation);
    return { message: `Reserva con id ${id} eliminada correctamente` };
  }
}