import { StatusCodes } from 'http-status-codes';
import { Authorized, Body, CookieParam, Get, HttpCode, Post, Res } from 'routing-controllers';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { config } from '../utils/config.service';
import { inject } from 'tsyringe';
import { ServiceController } from '../meta/routing.meta';
import { user, user_type } from '@prisma/client';
import { User } from '../meta/user.meta';

@ServiceController('/auth')
export class AuthController {
  constructor(@inject(AuthService) private readonly auth: AuthService) {}

  @HttpCode(StatusCodes.OK)
  @Post('/login')
  public async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.auth.login(dto.email, dto.password);
    const secure = config.string('NODE_ENV') === 'prod' ? true : false;
    res.cookie(config.string('TOKEN'), token, {
      path: '/api',
      maxAge: 60 * 60 * 1000,
      secure,
      httpOnly: true,
      sameSite: 'none',
      partitioned: true,
    });
    return { statusCode: StatusCodes.OK, message: 'Successful Login' };
  }

  @Authorized()
  @Get('/logout')
  public async logout(@CookieParam(config.string('TOKEN')) token: string) {
    await this.auth.logout(token);
    return { statusCode: 200, message: 'Logout' };
  }

  @Authorized()
  @Get('/me')
  public me(@User() me: user & { user_type: user_type }) {
    const user = this.auth.me(me);
    return { statusCode: StatusCodes.OK, message: 'User details', ...user };
  }
}
