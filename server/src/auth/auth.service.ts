import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as argon2 from 'argon2';
import { SafeUserDataDto } from '../users/dto/safe-user-data.dto';
import { AccessToken } from '../graphql';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async handleLogin(username: string, password: string): Promise<AccessToken> {
    const user = await this.validateUser(username, password);
    const accessToken = await this.jwtService.sign({
      expiryIs: '15m',
      secret: process.env.SECRET_ACCESS,
      payload: user,
    });
    return {
      accessToken,
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
    expiry: number | string;
    secret: string;
  }): Promise<{
    token: string;
  }> {
    const { expiry, payload, secret } = params;
    const token = this.jwtService.sign(payload, {
      expiresIn: expiry,
      secret,
    });
    return {
      token,
    };
  }
}
