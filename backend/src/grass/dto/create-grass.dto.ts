import { IsString, IsNotEmpty, IsOptional, MinLength, MaxLength, Matches } from 'class-validator';

export class CreateGrassDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(100)
  name!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  address!: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  phone!: string;

  @IsString()
  @IsOptional()
  @MaxLength(500)
  description?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'openTime debe tener formato HH:MM' })
  openTime?: string;

  @IsString()
  @IsOptional()
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, { message: 'closeTime debe tener formato HH:MM' })
  closeTime?: string;

  @IsString()
  @IsNotEmpty()
  adminCode!: string;
}