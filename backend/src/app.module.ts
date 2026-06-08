import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrassModule } from './grass/grass.module';
import { FieldsModule } from './fields/fields.module';
import { ReservationsModule } from './reservations/reservations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgresql://neondb_owner:npg_Xrs4AoG7abJp@ep-withered-credit-aq19plfx.c-8.us-east-1.aws.neon.tech/neondb',
      ssl: { rejectUnauthorized: false },
      autoLoadEntities: true,
      synchronize: true,
    }),
    GrassModule,
    FieldsModule,
    ReservationsModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}