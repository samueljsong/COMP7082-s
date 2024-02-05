import { NextFunction, Request, Response } from 'express';

export const handle = (fn: (req: Request, res: Response, next?: NextFunction) => Promise<void> | void) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      next(error);
    }
  };
};
