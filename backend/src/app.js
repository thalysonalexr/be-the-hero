if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

import './config';

import express from 'express';
import router from './router';
import cors from 'cors';
import { errors } from 'celebrate';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/v1', router);
app.use(errors());

export default app;
