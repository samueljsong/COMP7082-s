import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../utils/errors';
import { BadRequestError, ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ValidationError } from 'class-validator';
import { injectable } from 'tsyringe';

@Middleware({ type: 'after', priority: 1 })
@injectable()
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    if (error instanceof HttpError && error instanceof BadRequestError) {
      res.status(StatusCodes.BAD_REQUEST).send({
        statusCode: StatusCodes.BAD_REQUEST,
        error: ReasonPhrases.BAD_REQUEST,
        message: handleValidationErrors(error),
      });
    } else if (error instanceof HttpException) {
      res.status(error.statusCode).send({ statusCode: error.statusCode, error: error.error, message: error.message });
    } else if (error.message) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ statusCode: StatusCodes.INTERNAL_SERVER_ERROR, error: 'App error', message: error['message'] });
    } else {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({ stausCode: StatusCodes.INTERNAL_SERVER_ERROR, error: 'Unknown error', message: 'Some error occured' });
    }
  }
}

const handleValidationErrors = (error: BadRequestError) => {
  const errors: ValidationError[] = (error as BadRequestError & { errors: ValidationError[] }).errors;

  if (!errors) {
    return error.message;
  }

  const message = errors
    .map((error) => {
      const constraints = Object.values(error.constraints || []);
      return constraints.length > 0 ? constraints.join(' | ') : '';
    })
    .join(' | ');
  return message;
};
