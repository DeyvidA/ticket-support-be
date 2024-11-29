import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketsController } from './tickets.controller';
import { TicketsService } from './tickets.service';
import { Ticket, TicketSchema } from 'src/schemas/tickets.schema';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ticket.name, schema: TicketSchema }]),
    UsersModule,
  ],
  controllers: [TicketsController],
  providers: [TicketsService, UsersModule],
  exports: [TicketsService],
})
export class TicketsModule {}
