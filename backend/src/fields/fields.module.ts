// import { Module } from '@nestjs/common';
// import { FieldsService } from './fields.service';
// import { FieldsController } from './fields.controller';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { Field } from './entities/field.entity';

// @Module({
//   controllers: [FieldsController],
//   providers: [FieldsService],
//   imports: [TypeOrmModule.forFeature([Field])],
// })
// export class FieldsModule {}
import { Module } from '@nestjs/common';
import { FieldsService } from './fields.service';
import { FieldsController } from './fields.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Field } from './entities/field.entity';

@Module({
  controllers: [FieldsController],
  providers: [FieldsService],
  imports: [TypeOrmModule.forFeature([Field])],
})
export class FieldsModule {}