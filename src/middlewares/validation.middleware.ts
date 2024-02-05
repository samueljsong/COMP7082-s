import { ClassConstructor, plainToInstance } from 'class-transformer';
import { ValidationError, ValidatorOptions, validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { BadRequestException } from '../utils/errors';

export interface ValidateObject {
  target: 'body' | 'query' | 'params';
  dto: ClassConstructor<object>;
}

const token = ' | ';

export const ValidationMiddleware = (validateObject: ValidateObject[], options?: ValidatorOptions) => {
  return (req: Request, _res: Response, next: NextFunction) => {
    validateObject.forEach((toValidate) => {
      const transformed = plainToInstance(toValidate.dto, req[toValidate.target]);
      console.log(transformed);

      validateOrReject(transformed, { ...options, whitelist: true })
        .then(() => {
          req[toValidate.target] = transformed;
          next();
        })
        .catch((errors: ValidationError[]) => {
          const message = errors
            .map((error: ValidationError) => {
              const constraints = Object.values(error.constraints || []);
              console.log(constraints);
              return constraints.length > 0 ? constraints.join(token) : '';
            })
            .join(token);
          next(new BadRequestException(message));
        });
    });
  };
};
