import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Field } from './entities/field.entity';
import { CreateFieldDto } from './dto/create-field.dto';
import { UpdateFieldDto } from './dto/update-field.dto';

@Injectable()
export class FieldsService {
  constructor(
    @InjectRepository(Field)
    private readonly fieldRepository: Repository<Field>,
  ) {}

  async create(createFieldDto: CreateFieldDto): Promise<Field> {
    const { grassId, ...rest } = createFieldDto;
    const field = this.fieldRepository.create({
      ...rest,
      grass: { id: grassId },
    });
    return await this.fieldRepository.save(field);
  }

  async findAll(): Promise<Field[]> {
    return await this.fieldRepository.find({
      relations: ['grass'],
    });
  }

  async findByGrass(grassId: number): Promise<Field[]> {
    return await this.fieldRepository.find({
      where: { grass: { id: grassId } },
      relations: ['grass'],
    });
  }

  async findOne(id: number): Promise<Field> {
    const field = await this.fieldRepository.findOne({
      where: { id },
      relations: ['grass'],
    });
    if (!field) {
      throw new NotFoundException(`Cancha con id ${id} no encontrada`);
    }
    return field;
  }

  async update(id: number, updateFieldDto: UpdateFieldDto): Promise<Field> {
    const field = await this.findOne(id);
    const { grassId, ...rest } = updateFieldDto;
    Object.assign(field, rest);
    if (grassId) {
      field.grass = { id: grassId } as any;
    }
    return await this.fieldRepository.save(field);
  }

  async remove(id: number): Promise<{ message: string }> {
    const field = await this.findOne(id);
    await this.fieldRepository.remove(field);
    return { message: `Cancha con id ${id} eliminada correctamente` };
  }
}