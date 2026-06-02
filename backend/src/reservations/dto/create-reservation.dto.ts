import { IsString, IsNotEmpty, IsOptional, IsNumber, IsDateString, Matches, MaxLength } from 'class-validator';

export class CreateReservationDto {
  @IsDateString()
  @IsNotEmpty()
  date!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'startTime debe tener formato HH:MM',
  })
  startTime!: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: 'endTime debe tener formato HH:MM',
  })
  endTime!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  clientName!: string;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  clientPhone?: string;

  @IsNumber()
  @IsNotEmpty()
  fieldId!: number;

  @IsString()
  @IsOptional()
  status?: string;
}