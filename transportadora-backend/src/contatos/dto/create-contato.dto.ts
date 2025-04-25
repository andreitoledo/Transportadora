import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateContatoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  telefone: string;

  @IsOptional()
  @IsString()
  departamento?: string;

  @IsNotEmpty()
  @IsString()
  clienteId: string; // FK obrigatória
}
