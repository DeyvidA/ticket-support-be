import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Ticket, TicketDocument } from 'src/schemas/tickets.schema';
import { User, UserDocument } from 'src/schemas/user.schema';

@Injectable()
export class TicketsService {
  constructor(
    @InjectModel(Ticket.name) private ticketModel: Model<TicketDocument>,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async findAll() {
    return this.ticketModel.find();
  }

  async findOne(id: string, userId: string) {
    const ticket = await this.ticketModel.findOne({ _id: id });

    if (!ticket) {
      return null;
    }

    ticket.comments = ticket.comments.map((comment) => {
      return { ...comment, isCurrentUser: comment.user_id === userId };
    });

    return ticket;
  }

  async findByUserId(userId: string) {
    return this.ticketModel.find({ user_id: userId });
  }

  async create(body: any) {
    const { title, description, assignee_id, tags, userId } = body;

    const ticket = new this.ticketModel({
      title,
      description,
      assignee_id,
      tags,
      user_id: userId,
    });

    return ticket.save();
  }

  async update(id: string, body: any) {
    const { title, description, status, priority, assignee_id, tags } = body;

    return this.ticketModel.updateOne(
      { _id: id },
      { title, description, status, priority, assignee_id, tags },
    );
  }

  async deleteOne(id: string) {
    return this.ticketModel.deleteOne({
      _id: id,
    });
  }

  async addComment(id: string, userId: string, comment: string) {
    const parsedComment = {
      content: comment,
      user_id: userId,
      created_at: new Date(),
    };

    return this.ticketModel.updateOne(
      { _id: id },
      { $push: { comments: parsedComment } },
    );
  }
}
