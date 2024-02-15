import { InternalServerException } from './errors';

function get(name: string): string {
  const value = process.env[name];

  if (!value) {
    throw new InternalServerException('ENV Variable does not exist');
  }

  return value;
}

export const config = { get };
