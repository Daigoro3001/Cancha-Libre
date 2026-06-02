// import { Module } from '@nestjs/common';
// import { GrassService } from './grass.service';
// import { GrassController } from './grass.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Grass } from './entities/grass.entity';
// import { Field } from '../fields/entities/field.entity';
// import { User } from '../users/entities/user.entity';
// import { Reservation } from '../reservations/entities/reservation.entity';

// @Module({
//   controllers: [GrassController],
//   providers: [GrassService],
//   imports: [TypeOrmModule.forFeature([Grass, Field, User, Reservation])],
// })
// export class GrassModule {}                  
import { Module } from '@nestjs/common';
import { GrassService } from './grass.service';
import { GrassController } from './grass.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Grass } from './entities/grass.entity';

@Module({
  controllers: [GrassController],
  providers: [GrassService],
  imports: [TypeOrmModule.forFeature([Grass])],
})
export class GrassModule {}