import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { TipoCliente } from '@prisma/client';

export class CreateClienteDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsEnum(TipoCliente)
  tipo: TipoCliente;

  @IsNotEmpty()
  @IsString()
  documento: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsNotEmpty()
  @IsString()
  endereco: string;
}
