import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMotoristaDto } from './dto/create-motorista.dto';
import { UpdateMotoristaDto } from './dto/update-motorista.dto';

@Injectable()
export class MotoristasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateMotoristaDto) {
    return this.prisma.motorista.create({ data });
  }

  async findAll() {
    return this.prisma.motorista.findMany();
  }

  async findOne(id: string) {
    const motorista = await this.prisma.motorista.findUnique({ where: { id } });
    if (!motorista) throw new NotFoundException('Motorista não encontrado');
    return motorista;
  }

  async update(id: string, data: UpdateMotoristaDto) {
    return this.prisma.motorista.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    return this.prisma.motorista.delete({ where: { id } });
  }
}
