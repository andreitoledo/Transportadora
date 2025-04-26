import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsUUID, IsDateString } from 'class-validator';
import { CategoriaCnh } from '@prisma/client';

export class CreateMotoristaDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  cpf: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsNotEmpty()
  @IsEnum(CategoriaCnh)
  categoriaCnh: CategoriaCnh;

  @IsNotEmpty()
  @IsString()
  numeroCnh: string;

  @IsNotEmpty()
  @IsDateString()
  validadeCnh: Date;
}
