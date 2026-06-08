import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
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

  async create(createGrassDto: CreateGrassDto, ownerId: number): Promise<Grass> {
    const grass = this.grassRepository.create({
      ...createGrassDto,
      owner: { id: ownerId },
    });
    return await this.grassRepository.save(grass);
  }

  async findAll(): Promise<Grass[]> {
    return await this.grassRepository.find({
      relations: ['fields'],
    });
  }

  async findByOwner(ownerId: number): Promise<Grass[]> {
    return await this.grassRepository.find({
      where: { owner: { id: ownerId } },
      relations: ['fields'],
    });
  }

  async findOne(id: number): Promise<Grass> {
    const grass = await this.grassRepository.findOne({
      where: { id },
      relations: ['fields', 'owner'],
    });
    if (!grass) {
      throw new NotFoundException(`Grass con id ${id} no encontrado`);
    }
    return grass;
  }

  async update(id: number, updateGrassDto: UpdateGrassDto, ownerId: number): Promise<Grass> {
    const grass = await this.findOne(id);
    if (grass.owner?.id !== ownerId) {
      throw new ForbiddenException('No tienes permiso para editar este grass');
    }
    Object.assign(grass, updateGrassDto);
    return await this.grassRepository.save(grass);
  }

  async remove(id: number, ownerId: number): Promise<{ message: string }> {
    const grass = await this.findOne(id);
    if (grass.owner?.id !== ownerId) {
      throw new ForbiddenException('No tienes permiso para eliminar este grass');
    }
    await this.grassRepository.remove(grass);
    return { message: `Grass con id ${id} eliminado correctamente` };
  }
}