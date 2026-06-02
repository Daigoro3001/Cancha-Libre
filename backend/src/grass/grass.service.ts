import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Grass } from './entities/grass.entity';
import { CreateGrassDto } from './dto/create-grass.dto';
import { UpdateGrassDto } from './dto/update-grass.dto';

@Injectable()
export class GrassService {
  constructor(
    @InjectRepository(Grass)
    private readonly grassRepository: Repository<Grass>,
  ) {}

  async create(createGrassDto: CreateGrassDto): Promise<Grass> {
    const grass = this.grassRepository.create(createGrassDto);
    return await this.grassRepository.save(grass);
  }

  async findAll(): Promise<Grass[]> {
    return await this.grassRepository.find({
      relations: ['fields'],
    });
  }

  async findOne(id: number): Promise<Grass> {
    const grass = await this.grassRepository.findOne({
      where: { id },
      relations: ['fields'],
    });
    if (!grass) {
      throw new NotFoundException(`Grass con id ${id} no encontrado`);
    }
    return grass;
  }

  async update(id: number, updateGrassDto: UpdateGrassDto): Promise<Grass> {
    const grass = await this.findOne(id);
    Object.assign(grass, updateGrassDto);
    return await this.grassRepository.save(grass);
  }

  async remove(id: number): Promise<{ message: string }> {
    const grass = await this.findOne(id);
    await this.grassRepository.remove(grass);
    return { message: `Grass con id ${id} eliminado correctamente` };
  }
}