import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import routes from './routes';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);

app.use(cors());
//aceitar inputs json no servidor
app.use(express.json());
//accept the index of routes
app.use(routes);

app.use('/files', express.static(uploadConfig.uploadsFolder));

app.use(errors());

app.use(( err: Error, request: Request, response: Response, next: NextFunction) => {
  if ( err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message
    })
  }

  console.log(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal server error'
  })
});

//run the server on localhost port
app.listen(3333, () => {
  console.log('Server started on 3333')
})

