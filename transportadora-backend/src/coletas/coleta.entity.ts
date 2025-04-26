import { StatusColeta } from './status-coleta.enum';

export class Coleta {
  id: string;
  pedidoId: string;
  motoristaId: string;
  veiculoId: string;
  dataColeta: Date;
  status: StatusColeta;
  createdAt: Date;
  updatedAt: Date;
}
