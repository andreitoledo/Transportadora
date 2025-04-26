import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateEntregaDto } from './create-entrega.dto';
import { UpdateEntregaDto } from './update-entrega.dto';

@Injectable()
export class EntregasService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateEntregaDto) {
    return this.prisma.entrega.create({ data: dto });
  }

  findAll() {
    return this.prisma.entrega.findMany();
  }

  findOne(id: string) {
    return this.prisma.entrega.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateEntregaDto) {
    const entrega = await this.prisma.entrega.findUnique({ where: { id } });
    if (!entrega) {
      throw new NotFoundException('Entrega não encontrada');
    }
    return this.prisma.entrega.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    const entrega = await this.prisma.entrega.findUnique({ where: { id } });
    if (!entrega) {
      throw new NotFoundException('Entrega não encontrada');
    }
    return this.prisma.entrega.delete({ where: { id } });
  }
}
