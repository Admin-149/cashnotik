import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from '../users/users.module';
import { AuthService } from './auth.service';
import { JwtAccessStrategy, JwtRefreshStrategy } from './jwt.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [UsersModule, PassportModule, JwtModule.register({})],
  exports: [AuthService],
  providers: [AuthService, JwtAccessStrategy, JwtRefreshStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
