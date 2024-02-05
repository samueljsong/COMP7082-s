import 'reflect-metadata';

import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { UnknownRouteMiddleware } from './middlewares/unknown-route.middleware';
import { Route } from './utils/route';
import cors from 'cors';

export default class App {
  private _server: express.Express;
  private _port: string | number = process.env.PORT || 3000;

  constructor(routes: Route[], basePrefix: string = '') {
    this._server = express();
    this.initializeMiddlewares();
    this.initializeRouting(routes, basePrefix);
    this.initializeErrorHandling();
  }

  get server() {
    return this._server;
  }

  get port() {
    return this._port;
  }

  private initializeMiddlewares() {
    this.server.use(cors({ origin: true, credentials: true }));
    this._server.use(helmet());
    this._server.use(cookieParser());
    this._server.use(express.json());
    this._server.use(express.urlencoded({ extended: true }));
  }

  private initializeRouting(routes: Route[], basePrefix: string) {
    routes.forEach((route) => {
      if (route.exludePrefix) {
        this._server.use(route.path, route.router);
      } else {
        this._server.use(basePrefix + route.path, route.router);
      }
    });
  }

  private initializeErrorHandling() {
    this._server.use(UnknownRouteMiddleware);
    this._server.use(ErrorMiddleware);
  }

  public listen() {
    this._server.listen(this._port, () => console.log(`App listening on port ${this._port}`));
  }
}
