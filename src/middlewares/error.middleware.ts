import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../utils/errors';

export const ErrorMiddleware = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof HttpException) {
    response
      .status(error.statusCode)
      .send({ statusCode: error.statusCode, error: error.error, message: error.message });
  } else if (error['message']) {
    response.status(500).send({ statusCode: 500, error: 'App error', message: error['message'] });
  } else {
    response.status(500).send({ statusCode: 500, error: 'Unknown error', message: 'Some error occured' });
  }
};
