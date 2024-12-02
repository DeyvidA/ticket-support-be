import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { TicketsService } from '../tickets.service';

@Injectable()
export class TicketOwnershipGuard implements CanActivate {
  constructor(private readonly ticketService: TicketsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request.user.sub;

    const ticketId = request.params.id;

    const ticket = await this.ticketService.findOne(ticketId, userId);
    if (!ticket) {
      throw new NotFoundException('Ticket not found');
    }

    if (ticket.user_id !== userId) {
      throw new UnauthorizedException('You are not the owner of this ticket');
    }

    return true;
  }
}
