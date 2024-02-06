import { NextFunction, Request, Response } from 'express';
import { HttpException } from '../utils/errors';
import { BadRequestError, HttpError } from 'routing-controllers';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { ValidationError } from 'class-validator';

export const ErrorMiddleware = (error: Error, _request: Request, response: Response, _next: NextFunction) => {
  if (error instanceof HttpError && error instanceof BadRequestError) {
    response
      .status(StatusCodes.BAD_REQUEST)
      .send({
        statusCode: StatusCodes.BAD_REQUEST,
        error: ReasonPhrases.BAD_REQUEST,
        message: handleValidationErrors(error),
      });
  } else if (error instanceof HttpException) {
    response
      .status(error.statusCode)
      .send({ statusCode: error.statusCode, error: error.error, message: error.message });
  } else if (error['message']) {
    response.status(500).send({ statusCode: 500, error: 'App error', message: error['message'] });
  } else {
    response.status(500).send({ statusCode: 500, error: 'Unknown error', message: 'Some error occured' });
  }
};

const handleValidationErrors = (error: BadRequestError) => {
  const errors: ValidationError[] = error.errors as ValidationError[];
  const message = errors
    .map((error) => {
      const constraints = Object.values(error.constraints || []);
      return constraints.length > 0 ? constraints.join(' | ') : '';
    })
    .join(' | ');
  return message;
};
