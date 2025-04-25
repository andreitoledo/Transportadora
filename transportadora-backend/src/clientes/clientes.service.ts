import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from './dto/create-cliente.dto';
import { UpdateClienteDto } from './dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  create(data: CreateClienteDto) {
    return this.prisma.cliente.create({ data });
  }

  findAll() {
    return this.prisma.cliente.findMany();
  }

  findOne(id: string) {
    return this.prisma.cliente.findUnique({ where: { id } });
  }

  update(id: string, data: UpdateClienteDto) {
    return this.prisma.cliente.update({ where: { id }, data });
  }

  remove(id: string) {
    return this.prisma.cliente.delete({ where: { id } });
  }
}
