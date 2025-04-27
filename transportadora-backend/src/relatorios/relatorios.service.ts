import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RelatoriosService {
  constructor(private prisma: PrismaService) {}

  async getPedidosStatus() {
    const result = await this.prisma.pedido.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
    });

    return result.map((r) => ({
      status: r.status,
      total: r._count._all,
    }));
  }

  async getColetasStatus() {
    const result = await this.prisma.coleta.groupBy({
      by: ['status'],
      _count: {
        _all: true,
      },
    });

    return result.map((r) => ({
      status: r.status,
      total: r._count._all,
    }));
  }
}
