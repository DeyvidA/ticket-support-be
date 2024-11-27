import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type TicketDocument = HydratedDocument<Ticket>;

@Schema()
export class Ticket extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true, default: 'open' })
  status: string;

  @Prop({ required: true, default: 'low' })
  priority: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: false })
  assignee_id: string;

  @Prop({ required: false })
  tags: string[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);
