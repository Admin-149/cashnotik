import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { SafeUserDataDto } from '../users/dto/safe-user-data.dto';
import { Token } from '../graphql';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async handleLogin(username: string, password: string): Promise<Token> {
    const user = await this.validateUser(username, password);
    const accessToken = await this.generateJWTToken({
      expiryInSeconds: 15 * 60,
      secret: process.env.SECRET_ACCESS,
      payload: user,
    });
    return {
      accessToken: accessToken.token,
      accessTokenExpiry: accessToken.expiry,
    };
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

  async generateJWTToken(params: {
    payload: any;
    expiryInSeconds: number;
    secret: string;
  }): Promise<{
    token: string;
    expiry: number;
  }> {
    const { expiryInSeconds, payload, secret } = params;
    const expiry = Math.floor(Date.now() / 1000) + expiryInSeconds;
    const token = this.jwtService.sign(payload, {
      expiresIn: expiryInSeconds,
      secret,
    });
    return {
      token,
      expiry,
    };
  }
}
