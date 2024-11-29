import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { TicketsService } from './tickets.service';

type TicketCreate = {
  title: string;
  description: string;
  assignee_id: string;
  tags: string[];
};

type TicketUpdate = {
  title: string;
  description: string;
  status: string;
  priority: string;
  assignee_id: string;
  tags: string[];
};

@UseGuards(JwtAuthGuard)
@Controller('tickets')
export class TicketsController {
  constructor(private readonly ticketService: TicketsService) {}

  @Get()
  async findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.ticketService.findOne(id);
  }

  @Post('create')
  async create(@Body() body: TicketCreate) {
    return this.ticketService.create(body);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() body: TicketUpdate) {
    const { title, description, status, priority, assignee_id, tags } = body;
    return this.ticketService.update(id, {
      title,
      description,
      status,
      priority,
      assignee_id,
      tags,
    });
  }

  @Patch(':id/assign')
  async assign(@Param('id') id: string, @Body() body: { assignee_id: string }) {
    const { assignee_id } = body;
    return this.ticketService.update(id, { assignee_id });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.ticketService.deleteOne(id);
  }
}
