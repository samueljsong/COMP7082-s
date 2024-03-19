import 'reflect-metadata';

import { describe, expect, it, vi } from 'vitest';
import { ErrorMiddleware } from '../error.middleware';
import { Request, Response } from 'express';
import { BadRequestError } from 'routing-controllers';
import { ValidationError } from 'class-validator';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

describe('error middleware', () => {
  const errorMiddleware = new ErrorMiddleware();

  it('should catch non http errors', () => {
    const message = 'Non http error';
    const expected = { statusCode: 500, error: 'App error', message };

    const reqMock = {} as unknown as Request;
    const resMock = {} as unknown as Response;
    resMock.status = vi.fn().mockImplementation((code: number) => resMock);
    resMock.send = vi.fn().mockImplementation((body: any) => ({ ...body }));

    const error = new Error('Non http error');

    errorMiddleware.error(error, reqMock, resMock, () => {});
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.send).toHaveBeenCalledWith(expected);
  });

  it('should catch non errors being thrown', () => {
    const expected = { statusCode: 500, error: 'Unknown error', message: 'Some error occured' };

    const reqMock = {} as unknown as Request;
    const resMock = {} as unknown as Response;
    resMock.status = vi.fn().mockImplementation((code: number) => resMock);
    resMock.send = vi.fn().mockImplementation((body: any) => ({ ...body }));

    const notError = { error: "Why throw something that's not error" } as unknown as Error;

    errorMiddleware.error(notError, reqMock, resMock, () => {});
    expect(resMock.status).toHaveBeenCalledWith(500);
    expect(resMock.send).toHaveBeenCalledWith(expected);
  });

  it('should reformat routing-controller thrown validation errors', () => {
    const expected = {
      statusCode: StatusCodes.BAD_REQUEST,
      error: ReasonPhrases.BAD_REQUEST,
      message: 'email must be an email | password must not be empty',
    };
    const reqMock = {} as unknown as Request;
    const resMock = {} as unknown as Response;
    resMock.status = vi.fn().mockImplementation((code: number) => resMock);
    resMock.send = vi.fn().mockImplementation((body: any) => ({ ...body }));

    const validationError1 = new ValidationError();
    const validationError2 = new ValidationError();
    const errors: ValidationError[] = [validationError1, validationError2];

    validationError1.constraints = { isEmail: 'email must be an email' };
    validationError2.constraints = { isNotEmpty: 'password must not be empty' };

    const error = new BadRequestError('Validation error') as unknown as BadRequestError & { errors: ValidationError[] };
    error.errors = errors;

    errorMiddleware.error(error, reqMock, resMock, () => {});
    expect(resMock.status).toBeCalledWith(400);
    expect(resMock.send).toBeCalledWith(expected);
  });

  it('should handle routing controller non-validation bad request errors', () => {
    const expected = {
      statusCode: StatusCodes.BAD_REQUEST,
      error: ReasonPhrases.BAD_REQUEST,
      message: 'Bad request but not validation error',
    };
    const reqMock = {} as unknown as Request;
    const resMock = {} as unknown as Response;
    resMock.status = vi.fn().mockImplementation((code: number) => resMock);
    resMock.send = vi.fn().mockImplementation((body: any) => ({ ...body }));

    const error = new BadRequestError('Bad request but not validation error');
    errorMiddleware.error(error, reqMock, resMock, () => {});
    expect(resMock.status).toHaveBeenCalledWith(400);
    expect(resMock.send).toHaveReturnedWith(expected);
  });
});
