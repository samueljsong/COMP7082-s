import { Controller } from 'routing-controllers';
import { Service } from 'typedi';

export function ServiceController(...args: Parameters<typeof Controller>) {
  return (target: new (...args: any[]) => any) => {
    Service()(target);
    Controller(...args)(target);
  };
}
