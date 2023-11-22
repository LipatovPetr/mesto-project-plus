import express, { Response } from 'express';
import ExtendedError from './errors/extended-error';
import { login, createUser } from './controllers/users';
import { requestLogger, errorLogger } from './middlewares/logger';
import auth from './middlewares/auth';
import { ExtendedRequest } from './types';
import connectDB from './db/connect';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

require('dotenv').config();
const { errors } = require('celebrate');

// variables

const { PORT = 3000, MONGO_URI = '' } = process.env;
const app = express();

// routes & middleware

app.use(requestLogger);
app.use(express.json());

app.get('/signin', login);
app.post('/signup', createUser);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.use(errorLogger);
app.use(errors());
app.use((err: ExtendedError, req: ExtendedRequest, res: Response) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === 500
        ? 'Oops! Something went wrong on our server.'
        : message,
  });
});

// start app function

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// calls

start();
