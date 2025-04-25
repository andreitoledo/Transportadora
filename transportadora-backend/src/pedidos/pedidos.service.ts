import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePedidoDto } from './dto/create-pedido.dto';
import { UpdatePedidoDto } from './dto/update-pedido.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class PedidosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreatePedidoDto) {
    const codigoRastreamento = 'PED-' + randomUUID().slice(0, 8).toUpperCase();
    return this.prisma.pedido.create({
      data: {
        ...data,
        codigoRastreamento,
      },
    });
  }

  findAll() {
    return this.prisma.pedido.findMany({
      include: {
        remetente: true,
        destinatario: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.pedido.findUnique({
      where: { id },
      include: {
        remetente: true,
        destinatario: true,
      },
    });
  }

  async update(id: string, data: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data: {
        descricao: data.descricao,
        valorMercadoria: data.valorMercadoria,
        peso: data.peso,
        dimensoes: data.dimensoes,
        tipoEntrega: data.tipoEntrega,
        status: data.status, // ✅ adicionar
        enderecoColeta: data.enderecoColeta,
        enderecoEntrega: data.enderecoEntrega,
        observacoes: data.observacoes,
        remetenteId: data.remetenteId,
        destinatarioId: data.destinatarioId,
      },
    });
  }
  

  remove(id: string) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}
