import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateVeiculoDto } from './dto/create-veiculo.dto';
import { UpdateVeiculoDto } from './dto/update-veiculo.dto';

@Injectable()
export class VeiculosService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateVeiculoDto) {
    return this.prisma.veiculo.create({ data: dto });
  }

  findAll() {
    return this.prisma.veiculo.findMany();
  }

  findOne(id: string) {
    return this.prisma.veiculo.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateVeiculoDto) {
    const veiculo = await this.prisma.veiculo.findUnique({ where: { id } });
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }
    return this.prisma.veiculo.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    const veiculo = await this.prisma.veiculo.findUnique({ where: { id } });
    if (!veiculo) {
      throw new NotFoundException('Veículo não encontrado');
    }
    return this.prisma.veiculo.delete({ where: { id } });
  }
}
