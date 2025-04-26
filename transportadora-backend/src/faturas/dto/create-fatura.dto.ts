import { IsNotEmpty, IsEnum, IsOptional, IsUUID, IsNumber, IsDateString } from 'class-validator';
import { StatusFatura } from '../enums/status-fatura.enum';

export class CreateFaturaDto {
  @IsUUID()
  pedidoId: string;

  @IsNumber()
  valor: number;

  @IsEnum(StatusFatura)
  status: StatusFatura;

  @IsDateString()
  dataVencimento: string;

  @IsOptional()
  @IsDateString()
  dataPagamento?: string;
}
