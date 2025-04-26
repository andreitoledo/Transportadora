import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { FaturasService } from './faturas.service';
import { CreateFaturaDto } from './dto/create-fatura.dto';
import { UpdateFaturaDto } from './dto/update-fatura.dto';

@Controller('faturas')
@ApiTags('Faturas')
@Controller('faturas')
export class FaturasController {
  constructor(private readonly faturasService: FaturasService) {}

  @Post()
  create(@Body() createFaturaDto: CreateFaturaDto) {
    return this.faturasService.create(createFaturaDto);
  }

  @Get()
  findAll() {
    return this.faturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.faturasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFaturaDto: UpdateFaturaDto) {
    return this.faturasService.update(id, updateFaturaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.faturasService.remove(id);
  }
}
