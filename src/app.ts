const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const dotenv = require('dotenv');
import { Request, Response, NextFunction } from 'express';
import { GlobalExceptionHandler } from './middleware/global-exception-handler';
import apiRouter from './routers';

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;

app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

  if (req.method === 'OPTIONS') {
    res.send(200);
  } else {
    next();
  }
});
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(GlobalExceptionHandler.exceptionHandle);
app.use('/api', apiRouter);

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
