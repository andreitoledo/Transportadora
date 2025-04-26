import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateColetaDto } from 'src/coletas/create-coleta.dto';
import { UpdateColetaDto } from 'src/coletas/update-coleta.dto';

@Injectable()
export class ColetasService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateColetaDto) {
    return this.prisma.coleta.create({
      data: {
        dataColeta: dto.dataColeta,
        status: dto.status,
        pedidoId: dto.pedidoId,
        motoristaId: dto.motoristaId,
        veiculoId: dto.veiculoId, // ✅ novo campo
      },
    });
  }

  async findAll() {
    return this.prisma.coleta.findMany({
      include: {
        pedido: true,
        motorista: true,
        veiculo: true, // ✅ incluir dados do veículo
      },
    });
  }

  async findOne(id: string) {
    const coleta = await this.prisma.coleta.findUnique({
      where: { id },
      include: {
        pedido: true,
        motorista: true,
        veiculo: true, // ✅ incluir dados do veículo
      },
    });
    if (!coleta) throw new NotFoundException('Coleta não encontrada');
    return coleta;
  }

  async update(id: string, dto: UpdateColetaDto) {
    return this.prisma.coleta.update({
      where: { id },
      data: {
        dataColeta: dto.dataColeta,
        status: dto.status,
        motoristaId: dto.motoristaId,
        veiculoId: dto.veiculoId, // ✅ permitir atualizar veículo
      },
    });
  }

  async remove(id: string) {
    return this.prisma.coleta.delete({
      where: { id },
    });
  }
}
