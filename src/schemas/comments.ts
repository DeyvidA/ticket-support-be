import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema()
export class Comment extends Document {
  @Prop({ required: true })
  ticket_id: string;

  @Prop({ required: true })
  user_id: string;

  @Prop({ required: true })
  comment: string;

  @Prop({ default: [] })
  attached_files: string[];

  @Prop({ default: Date.now })
  created_at: Date;

  @Prop({ default: Date.now })
  updated_at: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
