import { ReasonPhrases, StatusCodes } from 'http-status-codes';

export class HttpException extends Error {
  public statusCode: number;
  public error: string;

  constructor(statusCode: number, error: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.BAD_REQUEST, ReasonPhrases.BAD_REQUEST, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.UNAUTHORIZED, ReasonPhrases.UNAUTHORIZED, message);
  }
}

export class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.FORBIDDEN, ReasonPhrases.FORBIDDEN, message);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.NOT_FOUND, ReasonPhrases.NOT_FOUND, message);
  }
}

export class InternalServerException extends HttpException {
  constructor(message: string) {
    super(StatusCodes.INTERNAL_SERVER_ERROR, ReasonPhrases.INTERNAL_SERVER_ERROR, message);
  }
}
