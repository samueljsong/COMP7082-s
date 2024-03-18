import { InternalServerError } from 'routing-controllers';

export const config = {
  string: (key: string) => {
    const value = process.env[key];

    if (!value) {
      throw new InternalServerError(`ENV variable, ${key} does not exist`);
    }

    return value;
  },
  int: (key: string) => {
    const value = config.string(key);
    const parsed = parseInt(value);

    if (isNaN(parsed)) {
      throw new InternalServerError(`value of key: ${key} cannot be parsed into an integer`);
    }

    return parsed;
  },
};
