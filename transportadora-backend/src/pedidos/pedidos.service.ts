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

  update(id: string, data: UpdatePedidoDto) {
    return this.prisma.pedido.update({
      where: { id },
      data,
    });
  }

  remove(id: string) {
    return this.prisma.pedido.delete({
      where: { id },
    });
  }
}
