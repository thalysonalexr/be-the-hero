if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

import './config';

const host = process.env.BASE_URL;
const port = process.env.PORT;

import express from 'express';
import router from './router';
import cors from 'cors';
import { errors } from 'celebrate';

const server = express();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use('/v1', router);
server.use(errors());

server.listen(port, host, () => {
  console.log(`Application running in http://${host}:${port}`);
});
