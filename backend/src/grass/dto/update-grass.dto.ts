import { PartialType } from '@nestjs/mapped-types';
import { CreateGrassDto } from './create-grass.dto';

export class UpdateGrassDto extends PartialType(CreateGrassDto) {}