import { Controller } from 'routing-controllers';
import { injectable } from 'tsyringe';

export function ServiceController(...args: Parameters<typeof Controller>) {
  return (target: new (...args: any[]) => any) => {
    injectable()(target);
    Controller(...args)(target);
  };
}
