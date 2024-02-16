import { StatusCodes } from 'http-status-codes';
import { Authorized, Body, Controller, CookieParam, Get, HttpCode, Post, Req, Res } from 'routing-controllers';
import { LoginDto } from './dtos/login.dto';
import Container from 'typedi';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { config } from '../utils/config.service';

@Controller('/auth')
export class AuthController {
  private readonly auth = Container.get(AuthService);

  @HttpCode(StatusCodes.OK)
  @Post('/login')
  public async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.auth.login(dto.email, dto.password);
    res.cookie(config.string('TOKEN'), token, { path: '/api', maxAge: 60 * 1000, httpOnly: true });
    return { statusCode: StatusCodes.OK, message: 'Successful Login' };
  }

  @Authorized()
  @Get('/logout')
  public async logout(@CookieParam(config.string('TOKEN')) token) {
    await this.auth.logout(token);
    return { statusCode: 200, message: 'Logout' };
  }

  @Authorized()
  @Get('/me')
  public me(@Req() req: Request) {
    const user = this.auth.me(req['user']);
    return { statusCode: StatusCodes.OK, message: 'User details', ...user };
  }
}
