import { InternalServerError } from 'routing-controllers';

export const config = {
  string: (key: string) => {
    const value = process.env[key];

    if (!value) {
      throw new InternalServerError('ENV Variable does not exist');
    }

    return value;
  },
  int: (key: string) => {
    const value = config.string(key);
    return parseInt(value);
  },
};
