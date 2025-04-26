import { StatusEntrega } from '@prisma/client';

export class Entrega {
  id: string;
  coletaId: string;
  dataEntrega: Date;
  statusEntrega: StatusEntrega;
  createdAt: Date;
  updatedAt: Date;
}
