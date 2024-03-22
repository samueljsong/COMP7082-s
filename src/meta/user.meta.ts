import { user, user_type } from '@prisma/client';
import { Request } from 'express';
import { createParamDecorator } from 'routing-controllers';

export function User() {
  return createParamDecorator({
    value: (action) => {
      const req = action.request as Request & { user: user & { user_type: user_type } };
      return req.user;
    },
  });
}
