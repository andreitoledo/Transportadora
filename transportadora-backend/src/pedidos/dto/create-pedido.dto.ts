import { IsNotEmpty, IsEnum, IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { TipoEntrega, StatusPedido } from '@prisma/client'; // importa também o StatusPedido

export class CreatePedidoDto {
  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNumber()
  peso: number;

  @IsNotEmpty()
  @IsString()
  dimensoes: string;

  @IsNumber()
  valorMercadoria: number;

  @IsEnum(TipoEntrega)
  tipoEntrega: TipoEntrega;

  @IsEnum(StatusPedido) // 👈 adicionar aqui!
  status: StatusPedido; // 👈 adicionar aqui!

  @IsOptional()
  @IsString()
  observacoes?: string;

  @IsNotEmpty()
  @IsString()
  enderecoColeta: string;

  @IsNotEmpty()
  @IsString()
  enderecoEntrega: string;

  @IsUUID()
  remetenteId: string;

  @IsUUID()
  destinatarioId: string;
}
