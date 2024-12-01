import {
  Controller,
  Get,
  Param,
  Post,
  Patch,
  Body,
  Delete,
  Request,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard } from 'src/auth/guards/jwt.auth.guard';
import { TicketsService } from './tickets.service';
import { TicketOwnershipGuard } from './guards/ticket-ownership.auth.guard';

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
  async findAll(@Request() req) {
    const user = req.user;
    const isAdmin = user.role === 'admin';

    if (isAdmin) {
      return this.ticketService.findAll();
    } else {
      return this.ticketService.findByUserId(user.sub);
    }
  }

  @Get(':id')
  async findOne(@Request() req, @Param('id') id: string) {
    const user = req.user;
    return this.ticketService.findOne(id, user.sub);
  }

  @Post('create')
  async create(@Body() body: TicketCreate) {
    return this.ticketService.create(body);
  }

  @UseGuards(TicketOwnershipGuard)
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

  @UseGuards(TicketOwnershipGuard)
  @Post(':id/comment')
  async comment(
    @Request() req,
    @Param('id') id: string,
    @Body() body: { content: string },
  ) {
    const user = req.user;

    const { content } = body;
    return this.ticketService.addComment(id, user.sub, content);
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
