import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Post('create')
  async create(@Body() body: any) {
    const { username, email, password, role } = body;
    return this.usersService.create(username, email, password, role);
  }
}
