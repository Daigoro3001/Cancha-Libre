import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, UseGuards, Request } from '@nestjs/common';
import { GrassService } from './grass.service';
import { CreateGrassDto } from './dto/create-grass.dto';
import { UpdateGrassDto } from './dto/update-grass.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('grass')
export class GrassController {
  constructor(private readonly grassService: GrassService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createGrassDto: CreateGrassDto, @Request() req: any) {
    return this.grassService.create(createGrassDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.grassService.findAll();
  }

  @Get('my')
  @UseGuards(JwtAuthGuard)
  findMyGrass(@Request() req: any) {
    return this.grassService.findByOwner(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.grassService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateGrassDto: UpdateGrassDto,
    @Request() req: any,
  ) {
    return this.grassService.update(id, updateGrassDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id', ParseIntPipe) id: number, @Request() req: any) {
    return this.grassService.remove(id, req.user.id);
  }
}