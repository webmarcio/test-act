import express, { Application, Request, Response } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import logger from 'morgan';
import helmet from 'helmet';
import dotenv from 'dotenv';

import Routes from '../interfaces/routes'

class Server {
  public app: Application;

  constructor() {
    dotenv.config();
    this.app = express();
    this.middlewares();
    this.routes();
    this.database();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(logger('dev'));
    this.app.use(helmet());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  routes() {
    this.app.use('/api/v1', Routes);
  }

  database() {
    console.log(process.env.DATABASE_URL);
    mongoose.connect(process.env.DATABASE_URL!)
      .then(() => {
          console.log('Conectado ao MongoDB');
      })
      .catch(err => {
          console.error('Erro ao conectar ao MongoDB', err);
      });
  }
}

export default new Server();