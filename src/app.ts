import 'dotenv/config';
import express, { Response } from 'express';

const app = express();

app.get('/', (_, res: Response) => {
  res.send('Welcome!');
});

app.get('/health', (_, res: Response) => {
  res.send();
});

app.get('/asd', (req, res) => {
  res.send('asd');
});

export default app;
