import { Model } from 'mongoose';
import { Injectable, Inject } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<IUser>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<IUser> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findOne(id: string): Promise<IUser> {
    return this.userModel.findOne({
      _id: id,
    });
  }

  async findAll(): Promise<IUser[]> {
    return this.userModel.find().exec();
  }
}
