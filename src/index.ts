import 'dotenv/config';

import App from './app';
import { HealthRoute } from './health/health.route';
import { AppRoute } from './app/app.route';

const app = new App([new AppRoute(), new HealthRoute()], '/api');
app.listen();
