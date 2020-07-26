import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { SafeUserDataDto } from '../users/dto/safe-user-data.dto';
import { Request, Response } from 'express';
import { refreshTokenExtractor } from './utils/cookieExtractor';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async handleLogin(username: string, password: string, response: Response): Promise<Response> {
    const user = await this.validateUser(username, password);
    return this.generateTokens(user, response);
  }

  async handleRefreshToken(request: Request, response: Response): Promise<Response> {
    const refreshToken = refreshTokenExtractor(request);
    try {
      const { exp, ...payload }  = await this.jwtService.verify(refreshToken, {secret: process.env.SECRET_REFRESH});
      return this.generateTokens(payload, response);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }

  async generateTokens(payload, response: Response): Promise<Response> {
    const accessToken = this.jwtService.sign(payload,{
      expiresIn: parseInt(process.env.SECRET_ACCESS_EXPIRY),
      secret: process.env.SECRET_ACCESS,
    });
    const refreshToken = this.jwtService.sign(payload,{
      expiresIn: parseInt(process.env.SECRET_REFRESH_EXPIRY),
      secret: process.env.SECRET_REFRESH,
    });
    response.cookie('refresh_token', refreshToken, {
      maxAge: parseInt(process.env.SECRET_REFRESH_EXPIRY) * 1000,
      httpOnly: true,
      sameSite: true
    });
    return response.send({ accessToken });
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<SafeUserDataDto> {
    const user = await this.usersService.findOne(username);
    if (user && (await argon2.verify(user.password, password))) {
      const { password, ...result } = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }
}
