import { Controller } from 'routing-controllers';
import { injectable, singleton } from 'tsyringe';

export function ServiceController(...args: Parameters<typeof Controller>) {
  return (target: new (...args: any[]) => any) => {
    injectable()(target);
    Controller(...args)(target);
  };
}

export interface ServiceOptions {
  scope: 'transient' | 'global';
}

export function Service(options: ServiceOptions = { scope: 'transient' }) {
  return (target: new (...args: any[]) => any) => {
    if (options.scope === 'transient') {
      injectable()(target);
    } else {
      singleton()(target);
    }
  };
}
