import { Controller, Post, Get, Body, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly service: UsersService) {}

  //@UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() dto: CreateUserDto) { return this.service.create(dto); }

  //@UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('programId') programId?: string, @Query('page') page = '1', @Query('limit') limit = '20') {
    return this.service.findAllByProgram(programId, Number(page), Number(limit));
  }
}