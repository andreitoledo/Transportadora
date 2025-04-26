import { Module } from '@nestjs/common';
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

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    PrismaModule,
    UserModule,
    ClientesModule,
    ContatosModule,
    PedidosModule,
    MotoristasModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
