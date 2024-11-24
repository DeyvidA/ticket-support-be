import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';

import { AuthService } from './auth.service';
import { UsersModule } from 'src/models/users/users.module';
import { AuthController } from './controllers/auth.controller';
import config from 'src/config';

@Module({
  imports: [
    UsersModule,
    JwtModule.registerAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwt.secret,
          signOptions: {
            expiresIn: configService.jwt.expiresIn,
          },
        };
      },
    }),
  ],

  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
