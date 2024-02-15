import 'dotenv/config';

import App from './app';
import { AppController } from './app/app.controller';
import { HealthController } from './health/health.controller';
import { AuthController } from './auth/auth.controller';
import { AdminController } from './admin/admin.controller';


const app = new App([AppController, HealthController, AuthController, AdminController]);
app.listen();
