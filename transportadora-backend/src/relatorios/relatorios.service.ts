import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { format } from 'date-fns';

@Injectable()
export class RelatoriosService {
  constructor(private readonly prisma: PrismaService) { }

  async getPedidosStatus() {
    return this.prisma.pedido.groupBy({
      by: ['status'],
      _count: { status: true },
    });
  }

  async getColetasStatus() {
    return this.prisma.coleta.groupBy({
      by: ['status'],
      _count: { status: true },
    });
  }

  async getFaturamentoPorPeriodo() {
    const faturas = await this.prisma.fatura.findMany({
      select: {
        valor: true,
        dataPagamento: true, // ✅ Usar a data de pagamento!
      },
    });

    const faturamentoPorMes: { [mes: string]: number } = {};

    faturas.forEach(fatura => {
      if (fatura.dataPagamento) {
        const mes = format(new Date(fatura.dataPagamento), 'yyyy-MM'); // ✅ Corrigir para Date
        faturamentoPorMes[mes] = (faturamentoPorMes[mes] || 0) + Number(fatura.valor); // ✅ Convertendo Decimal para Number
      }
    });

    return faturamentoPorMes;
  }

  // Clientes

  async getPedidosPorCliente() {
    const pedidos = await this.prisma.pedido.findMany({
      select: {
        remetenteId: true,
      },
    });
  
    const clientes = await this.prisma.cliente.findMany({
      select: {
        id: true,
        nome: true,
      },
    });
  
    const pedidosPorCliente: { [clienteId: string]: number } = {};
  
    pedidos.forEach((pedido) => {
      pedidosPorCliente[pedido.remetenteId] = (pedidosPorCliente[pedido.remetenteId] || 0) + 1;
    });
  
    const resultado = clientes.map((cliente) => ({
      clienteId: cliente.id,
      clienteNome: cliente.nome,
      totalPedidos: pedidosPorCliente[cliente.id] || 0,
    }));
  
    // Só retorna quem tiver pelo menos 1 pedido
    return resultado.filter((item) => item.totalPedidos > 0);
  }
  

}
