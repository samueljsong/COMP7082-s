import 'dotenv/config';

import App from './app';
import { AppController } from './app/app.controller';
import { HealthController } from './health/health.controller';
import { AuthController } from './auth/auth.controller';

const app = new App([AppController, HealthController, AuthController]);
app.listen();
