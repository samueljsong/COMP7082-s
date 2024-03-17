import { user, user_type } from '@prisma/client';
import { Request } from 'express';
import { Action } from 'routing-controllers';
import { UnauthorizedException } from '../utils/errors';
import { verify } from 'jsonwebtoken';
import { RedisService } from '../redis/redis.service';
import { config } from '../utils/config.service';
import { container } from 'tsyringe';

export const Guard = async (action: Action, roles: string[]) => {
  const redis = container.resolve(RedisService);

  const request: Request = action.request;
  const token = extractToken(request);

  const inside = await redis.getValue(token);
  if (inside) {
    throw new UnauthorizedException('Blacklisted token');
  }

  let user: user & { user_type: user_type };

  try {
    user = verify(token, config.string('JWT_SECRET')) as user & { user_type: user_type };
    request['user'] = user;
  } catch (err) {
    throw new UnauthorizedException('Invalid token');
  }

  if (!roles || roles.length == 0) {
    return true;
  }

  if (!roles.includes(user.user_type.type)) {
    throw new UnauthorizedException('Not authorized');
  }

  return true;
};

function extractToken(req: Request): string {
  const cookies = req.cookies as { [key: string]: string };
  req.cookies.token;
  const token = cookies[config.string('TOKEN')];

  if (!token) {
    throw new UnauthorizedException('Token not provided');
  }

  return token;
}
