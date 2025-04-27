import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) {}

  async getPedidosStatus() {
    const aguardando = await this.prisma.pedido.count({
      where: { status: 'AGUARDANDO_COLETA' }
    });

    const emTransito = await this.prisma.pedido.count({
      where: { status: 'EM_TRANSITO' }
    });

    const entregue = await this.prisma.pedido.count({
      where: { status: 'ENTREGUE' }
    });

    return {
      aguardando_coleta: aguardando,
      em_transito: emTransito,
      entregue: entregue
    };
  }
}
