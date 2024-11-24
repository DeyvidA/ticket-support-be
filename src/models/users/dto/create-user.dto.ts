import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsEnum,
  MinLength,
  MaxLength,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';
import { User } from 'src/schemas/user.schema';

export class CreateUserDto implements Partial<User> {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  @ApiProperty({
    example: 'john_doe',
    description: 'The username of the user',
  })
  username: string;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: 'password', description: 'The password of the user' })
  passwordHash: string;

  @IsEnum(['customer', 'support', 'admin', 'superadmin'])
  @ApiProperty({ example: 'user', description: 'The role of the user' })
  role?: 'customer' | 'support' | 'admin' | 'superadmin';

  @IsNotEmpty()
  createdAt: Date;

  @IsNotEmpty()
  updatedAt: Date;
}
