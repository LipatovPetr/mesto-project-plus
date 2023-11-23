import express, { Response } from 'express';
import BadRequestError from './errors/bad-request';
import ForbiddenError from './errors/forbidden';
import NotFoundError from './errors/not-found';
import UnauthorizedError from './errors/unauthorized';
import { login, createUser } from './controllers/users';
import pageNotFound from './controllers/pageNotFound';
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
app.get('*', pageNotFound);

app.use(errorLogger);
app.use(errors());
app.use(
  (
    err:
      | BadRequestError
      | ForbiddenError
      | NotFoundError
      | UnauthorizedError,
    req: ExtendedRequest,
    res: Response,
  ) => {
    const { statusCode = 500, message } = err;
    res.status(statusCode).send({
      message:
        statusCode === 500
          ? 'Oops! Something went wrong on our server.'
          : message,
    });
  },
);

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
