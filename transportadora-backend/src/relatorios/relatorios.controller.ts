import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RelatoriosService } from './relatorios.service'; 
import { ApiOperation } from '@nestjs/swagger';

@ApiTags('relatorios')
@Controller('relatorios')
export class RelatoriosController {
  constructor(private readonly relatoriosService: RelatoriosService) {}

  @Get('pedidos-status')
  @ApiOperation({ summary: 'Listar total de pedidos por status' })
  async getPedidosStatus() {
    return this.relatoriosService.getPedidosStatus();
  }

  @Get('coletas-status')
  @ApiOperation({ summary: 'Listar total de coletas por status' })
  async getColetasStatus() {
    return this.relatoriosService.getColetasStatus();
  }

  @Get('faturamento-periodo')
  @ApiOperation({ summary: 'Listar faturamento total por mês' })
  async getFaturamentoPorPeriodo() {
    return this.relatoriosService.getFaturamentoPorPeriodo();
  }
}
