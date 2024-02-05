import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../utils/errors';

export const UnknownRouteMiddleware = (request: Request, response: Response, next: NextFunction) => {
  if (response.headersSent) {
    return;
  }
  next(new NotFoundException(`CANNOT ${request.method} ${request.path}`));
};
