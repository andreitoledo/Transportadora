import { Module } from '@nestjs/common';
import { FaturasService } from './faturas.service';
import { FaturasController } from './faturas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [FaturasController],
  providers: [FaturasService, PrismaService],
})
export class FaturasModule {}
