import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { GrassService } from './grass.service';
import { CreateGrassDto } from './dto/create-grass.dto';
import { UpdateGrassDto } from './dto/update-grass.dto';

@Controller('grass')
export class GrassController {
  constructor(private readonly grassService: GrassService) {}

  @Post()
  create(@Body() createGrassDto: CreateGrassDto) {
    return this.grassService.create(createGrassDto);
  }

  @Get()
  findAll() {
    return this.grassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grassService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() updateGrassDto: UpdateGrassDto) {
    return this.grassService.update(id, updateGrassDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.grassService.remove(id);
  }
}