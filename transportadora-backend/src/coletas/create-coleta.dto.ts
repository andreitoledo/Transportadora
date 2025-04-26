import { IsNotEmpty, IsUUID, IsDateString, IsEnum } from 'class-validator';
import { StatusColeta } from './status-coleta.enum';

export class CreateColetaDto {
  @IsNotEmpty()
  @IsUUID()
  pedidoId: string;

  @IsNotEmpty()
  @IsUUID()
  motoristaId: string;

  @IsNotEmpty()
  @IsUUID()
  veiculoId: string;

  @IsNotEmpty()
  @IsDateString()
  dataColeta: string;

  @IsEnum(StatusColeta)
  status?: StatusColeta; // Opcional porque vai default para PENDENTE se não informado
}
