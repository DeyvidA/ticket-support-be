import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '../auth.service';

export class LoginDto {
  username: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private AuthService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.AuthService.validateUser(
      loginDto.username,
      loginDto.password,
    );

    if (!user) {
      return { message: 'Invalid credentials' };
    }

    return this.AuthService.generateJWT(user);
  }
}
