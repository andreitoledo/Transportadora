import { IsNotEmpty, IsUUID, IsEnum, IsDateString } from 'class-validator';
import { StatusEntrega } from '@prisma/client';

export class CreateEntregaDto {
  @IsUUID()
  coletaId: string;

  @IsDateString()
  dataEntrega: string; // ou Date

  @IsEnum(StatusEntrega)
  statusEntrega: StatusEntrega;
}
