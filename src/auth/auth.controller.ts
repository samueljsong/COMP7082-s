import { StatusCodes } from 'http-status-codes';
import { Body, Controller, Get, HttpCode, Post, Req, Res } from 'routing-controllers';
import { LoginDto } from './dtos/login.dto';
import Container from 'typedi';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

@Controller('/auth')
export class AuthController {
  private readonly auth = Container.get(AuthService);

  @HttpCode(StatusCodes.OK)
  @Post('/login')
  public async login(@Body() dto: LoginDto, @Res() res: Response) {
    const token = await this.auth.login(dto.email, dto.password);
    res.cookie(process.env.TOKEN!, token, { path: '/api', maxAge: 60 * 1000, httpOnly: true });
    return { statusCode: StatusCodes.OK, message: 'Successful Login' };
  }

  @Get('/me')
  public me(@Req() req: Request) {
    const user = this.auth.me(req.cookies[process.env.TOKEN!]);
    return user;
  }
}
