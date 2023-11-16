require('dotenv').config();
import express, { Response } from 'express';
import { ExtendedRequest } from './types';
import connectDB from './db/connect';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { StatusCodes } from 'http-status-codes';

// variables

const { PORT = 3000, MONGO_URI = '' } = process.env;
const app = express();

// middleware

app.use(express.json());
app.use((req: ExtendedRequest, res, next) => {
  req.user = {
    _id: '655244cbfb0de97192ed0325',
  };
  next();
});

// routes

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('/', (req: ExtendedRequest, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).send('<h1>Страница не найдена</h1>');
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
