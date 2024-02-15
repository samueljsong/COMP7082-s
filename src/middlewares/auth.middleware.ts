import { user, user_type } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import { Action, ExpressMiddlewareInterface } from 'routing-controllers';
import { config } from '../utils/env';
import { UnauthorizedException } from '../utils/errors';
import { verify } from 'jsonwebtoken';

export class AuthGuard implements ExpressMiddlewareInterface {
  use(req: Request, _res: Response, next: NextFunction) {
    const token = extractToken(req);

    try {
      const user = verify(token, config.get('JWT_SECRET'));
      req['user'] = user;
      next();
    } catch (err) {
      next(new UnauthorizedException('Invalid token'));
    }
  }
}

export const Guard = async (action: Action, roles: string[]) => {
  const request: Request = action.request;
  const token = extractToken(request);

  try {
    const user = verify(token, config.get('JWT_SECRET')) as user & { user_type: user_type };
    request['user'] = user;

    if (roles.length == 0) {
      return true;
    }

    return roles.includes(user.user_type.type);
  } catch (err) {
    throw new UnauthorizedException('Invalid token');
  }
};

function extractToken(req: Request): string {
  const cookies = req.cookies as { [key: string]: string };
  req.cookies.token;
  const token = cookies[config.get('TOKEN')];

  if (!token) {
    throw new UnauthorizedException('Token not provided');
  }

  return token;
}
