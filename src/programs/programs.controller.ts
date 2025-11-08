import { Controller, Post, Get, Put, Delete, Body, Param, Query, UseGuards } from '@nestjs/common';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('programs')
export class ProgramsController {
  constructor(private readonly service: ProgramsService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateProgramDto) { return this.service.create(dto); }

  @Get()
  findAll(@Query('name') name?: string, @Query('page') page = '1', @Query('limit') limit = '10') {
    const filter: any = {};
    if (name) filter.name = { $regex: name, $options: 'i' };
    return this.service.findAll(filter, Number(page), Number(limit));
  }

  @Get(':id')
  findOne(@Param('id') id: string) { return this.service.findOne(id); }

  //@UseGuards(JwtAuthGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: CreateProgramDto) { return this.service.update(id, dto); }

  //@UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) { return this.service.remove(id); }
}