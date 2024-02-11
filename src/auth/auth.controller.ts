import { StatusCodes } from 'http-status-codes';
import { Body, Controller, HttpCode, Post } from 'routing-controllers';
import { LoginDto } from './dtos/login.dto';

@Controller('/auth')
export class AuthController {
  @HttpCode(StatusCodes.OK)
  @Post('/login')
  public login(@Body() dto: LoginDto) {
    return { email: dto.email };
  }
}
