import App from './app';
import { AppController } from './app/app.controller';
import { HealthController } from './health/health.controller';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';

declare module 'express-serve-static-core' {
  export interface CookieOptions {
    partitioned?: boolean;
  }
}

const app = new App([AppController, HealthController, AuthController, AdminController, UserController]);
console.log('SMALL');
app.listen();
