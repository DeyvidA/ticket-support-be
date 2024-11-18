import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { IUser } from './interfaces/user.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
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
