import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { Response, Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
    @Res() response: Response
  ) {
    return this.authService.handleLogin(username, password, response);
  }

  @Post('refresh-token')
  async refreshToken(@Req() request: Request, @Res() response: Response) {
    return this.authService.handleRefreshToken(request, response);
  }
}
