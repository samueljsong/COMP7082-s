import 'reflect-metadata';

import express from 'express';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import { ErrorMiddleware } from './middlewares/error.middleware';
import { UnknownRouteMiddleware } from './middlewares/unknown-route.middleware';
import cors from 'cors';
import { RoutingControllersOptions, useExpressServer } from 'routing-controllers';
import { Guard } from './middlewares/auth.middleware';
import { rateLimit } from 'express-rate-limit';
import { config } from './utils/config.service';
export default class App {
  private _server: express.Express;
  private _port: string | number = process.env.PORT || 3000;

  constructor(controllers: RoutingControllersOptions['controllers']) {
    this._server = express();
    this.initializeMiddlewares();
    this.initializeRouting(controllers);
  }

  get server() {
    return this._server;
  }

  get port() {
    return this._port;
  }

  private initializeMiddlewares() {
    this._server.use(cors({ origin: true, credentials: true }));
    this._server.use(helmet());
    this._server.use(cookieParser());
    this._server.use(express.json());
    this._server.use(express.urlencoded({ extended: true }));
    this.initializeRateLimiting();
  }

  private initializeRouting(controllers: RoutingControllersOptions['controllers']) {
    useExpressServer(this._server, {
      routePrefix: '/api',
      controllers,
      middlewares: [UnknownRouteMiddleware, ErrorMiddleware],
      defaultErrorHandler: false,
      authorizationChecker: Guard,
    });
  }

  private initializeRateLimiting() {
    this._server.use(
      rateLimit({
        windowMs: config.int('RATE_LIMIT_WINDOW') * 60 * 1000,
        limit: config.int('RATE_LIMIT_USER_LIMIT'),
        standardHeaders: 'draft-7',
        legacyHeaders: false,
      }),
    );
  }

  public listen() {
    this._server.listen(this._port, () => console.log(`App listening on port ${this._port}`));
  }
}
