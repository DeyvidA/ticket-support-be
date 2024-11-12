// user.interface.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
  role: 'user' | 'admin' | 'support_staff';
  createdAt: Date;
  updatedAt: Date;
}
