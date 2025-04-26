import { IsString, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { TipoVeiculo } from '@prisma/client'; // Importa o enum do Prisma!

export class CreateVeiculoDto {
  @IsString()
  @IsNotEmpty()
  placa: string;

  @IsString()
  @IsNotEmpty()
  modelo: string;

  @IsString()
  @IsNotEmpty()
  marca: string;

  @IsNumber()
  @IsNotEmpty()
  ano: number;

  @IsEnum(TipoVeiculo)
  tipo: TipoVeiculo;

  @IsNumber()
  @IsNotEmpty()
  capacidadeKg: number;
}
