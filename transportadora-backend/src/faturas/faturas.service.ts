import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { UpdateFaturaDto } from './dto/update-fatura.dto';

@Injectable()
export class FaturasService {
  constructor(private prisma: PrismaService) {}

  create(dto: CreateFaturaDto) {
    return this.prisma.fatura.create({ data: dto });
  }

  findAll() {
    return this.prisma.fatura.findMany();
  }

  findOne(id: string) {
    return this.prisma.fatura.findUnique({ where: { id } });
  }

  update(id: string, dto: UpdateFaturaDto) {
    return this.prisma.fatura.update({ where: { id }, data: dto });
  }

  remove(id: string) {
    return this.prisma.fatura.delete({ where: { id } });
  }
}
