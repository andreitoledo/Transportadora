import { Module } from '@nestjs/common';
import { ColetasService } from './coletas.service';
import { ColetasController } from './coletas.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [ColetasController],
  providers: [ColetasService, PrismaService],
})
export class ColetasModule {}
