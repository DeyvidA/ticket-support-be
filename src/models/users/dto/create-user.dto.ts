import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';
import { IUser } from '../interfaces/user.interface';

export class CreateUserDto implements Partial<IUser> {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  passwordHash: string;

  @IsEnum(['user', 'admin', 'support_staff'])
  @ApiProperty({ example: 'user', description: 'The role of the user' })
  role: 'user' | 'admin' | 'support_staff';

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
