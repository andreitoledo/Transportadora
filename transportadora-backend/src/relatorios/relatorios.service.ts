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

  // MOTORISTAS

  async getEntregasPorMotorista() {
    const entregas = await this.prisma.entrega.findMany({
      select: {
        coleta: {
          select: {
            motoristaId: true,
          },
        },
      },
    });
  
    const motoristas = await this.prisma.motorista.findMany({
      select: {
        id: true,
        nome: true,
      },
    });
  
    const entregasPorMotorista: { [motoristaId: string]: number } = {};
  
    entregas.forEach((entrega) => {
      const motoristaId = entrega.coleta?.motoristaId;
      if (motoristaId) {
        entregasPorMotorista[motoristaId] = (entregasPorMotorista[motoristaId] || 0) + 1;
      }
    });
  
    const resultado = motoristas.map((motorista) => ({
      motoristaId: motorista.id,
      motoristaNome: motorista.nome,
      totalEntregas: entregasPorMotorista[motorista.id] || 0,
    }));
  
    return resultado.filter((item) => item.totalEntregas > 0);
  }
  
  // VEICULOS

  async getColetasPorVeiculo() {
    const coletas = await this.prisma.coleta.findMany({
      select: {
        veiculoId: true,
      },
    });
  
    const veiculos = await this.prisma.veiculo.findMany({
      select: {
        id: true,
        placa: true,
        modelo: true,
        marca: true,
      },
    });
  
    const coletasPorVeiculo: { [veiculoId: string]: number } = {};
  
    coletas.forEach((coleta) => {
      if (coleta.veiculoId) {
        coletasPorVeiculo[coleta.veiculoId] = (coletasPorVeiculo[coleta.veiculoId] || 0) + 1;
      }
    });
  
    const resultado = veiculos.map((veiculo) => ({
      veiculoId: veiculo.id,
      placa: veiculo.placa,
      modelo: veiculo.modelo,
      marca: veiculo.marca,
      totalColetas: coletasPorVeiculo[veiculo.id] || 0,
    }));
  
    return resultado.filter((item) => item.totalColetas > 0);
  }

  // DASHBOARD COM OS RELATORIOS

  async getDashboard() {
    const [
      pedidosStatus,
      coletasStatus,
      faturamento,
      topClientes,
      entregasMotoristas,
      coletasVeiculo,
    ] = await Promise.all([
      this.getPedidosStatus(),
      this.getColetasStatus(),
      this.getFaturamentoPorPeriodo(), // ✅ nome correto
      this.getTopClientes(),           
      this.getEntregasPorMotorista(),
      this.getColetasPorVeiculo(),
    ]);
  
    return {
      pedidosStatus,
      coletasStatus,
      faturamento,
      topClientes,
      entregasMotoristas,
      coletasVeiculo,
    };
  }
  
  // TOP 5 CLIENTES COM MAIOR NUMERO DE PEDIDOS
  async getTopClientes() {
    const pedidosPorCliente = await this.prisma.pedido.groupBy({
      by: ['remetenteId'],
      _count: { id: true },
      orderBy: { _count: { id: 'desc' } },
      take: 5,
    });
  
    const result = [];
  
    for (const item of pedidosPorCliente) {
      const cliente = await this.prisma.cliente.findUnique({
        where: { id: item.remetenteId },
        select: { nome: true },
      });
  
      result.push({
        cliente: cliente?.nome || 'Desconhecido',
        totalPedidos: item._count.id,
      });
    }
  
    return result;
  }
  
  
  

}
