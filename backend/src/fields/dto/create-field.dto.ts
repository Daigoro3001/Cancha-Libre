import { IsString, IsNotEmpty, IsOptional, IsNumber, IsBoolean, Min, MaxLength, Matches } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsNumber()
  @IsOptional()
  @Min(0)
  pricePerHour?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  dayPrice?: number;

  @IsNumber()
  @IsOptional()
  @Min(0)
  nightPrice?: number;

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'nightStartTime debe tener formato HH:MM' })
  nightStartTime?: string;

  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @IsNumber()
  @IsNotEmpty()
  grassId!: number;

  @IsString()
  @IsNotEmpty()
  adminCode!: string;
}