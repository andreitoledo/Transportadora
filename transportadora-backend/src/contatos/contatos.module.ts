import { Module } from '@nestjs/common';
import { ContatosService } from './contatos.service';
import { ContatosController } from './contatos.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ContatosController],
  providers: [ContatosService, PrismaService],
})
export class ContatosModule {}
