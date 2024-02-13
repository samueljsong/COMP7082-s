import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../utils/errors';
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers';

@Middleware({ type: 'after', priority: 2 })
export class UnknownRouteMiddleware implements ExpressMiddlewareInterface {
  use(request: Request, response: Response, next: NextFunction) {
    if (response.headersSent) {
      return;
    }
    next(new NotFoundException(`CANNOT ${request.method} ${request.path}`));
  }
}
