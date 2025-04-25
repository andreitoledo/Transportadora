import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContatoDto } from './dto/create-contato.dto';
import { UpdateContatoDto } from './dto/update-contato.dto';

@Injectable()
export class ContatosService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateContatoDto) {
    return this.prisma.contato.create({ data });
  }

  findAll() {
    return this.prisma.contato.findMany({ include: { cliente: true } });
  }

  findByCliente(clienteId: string) {
    return this.prisma.contato.findMany({
      where: { clienteId },
    });
  }

  findOne(id: string) {
    return this.prisma.contato.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateContatoDto) {
    return this.prisma.contato.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.contato.delete({ where: { id } });
  }
}
