import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { ClientesModule } from './clientes/clientes.module';
import { ContatosModule } from './contatos/contatos.module';
import { PedidosModule } from './pedidos/pedidos.module';
import { MotoristasModule } from './motoristas/motoristas.module';
import { VeiculosModule } from './veiculos/veiculos.module';
import { ColetasModule } from './coletas/coletas.module';
import { EntregasModule } from './entregas/entregas.module';
import { FaturasModule } from './faturas/faturas.module';
import { RelatoriosModule } from './relatorios/relatorios.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    ClientesModule,
    ContatosModule,
    PedidosModule,
    MotoristasModule,
    VeiculosModule,
    ColetasModule,
    EntregasModule,
    FaturasModule,
    RelatoriosModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
