import App from './app';
import { AppController } from './app/app.controller';
import { HealthController } from './health/health.controller';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './admin/admin.controller';
import { UserController } from './user/user.controller';

const app = new App([AppController, HealthController, AuthController, AdminController, UserController]);
console.log('SMALL');
app.listen();
