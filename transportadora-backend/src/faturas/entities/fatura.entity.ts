export class Fatura {
    id: string;
    pedidoId: string;
    valor: number;
    status: 'PENDENTE' | 'PAGO' | 'CANCELADO';
    dataVencimento: Date;
    dataPagamento?: Date;
    createdAt: Date;
    updatedAt: Date;
  }
  