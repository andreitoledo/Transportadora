import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EntregasService } from './entregas.service';
import { CreateEntregaDto } from './create-entrega.dto';
import { UpdateEntregaDto } from './update-entrega.dto';

@Controller('entregas')
@ApiTags('Entregas')
@Controller('entregas')
export class EntregasController {
  constructor(private readonly entregasService: EntregasService) {}

  @Post()
  create(@Body() dto: CreateEntregaDto) {
    return this.entregasService.create(dto);
  }

  @Get()
  findAll() {
    return this.entregasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.entregasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateEntregaDto) {
    return this.entregasService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.entregasService.remove(id);
  }
}
