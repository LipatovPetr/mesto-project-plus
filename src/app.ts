import express, { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { login, createUser } from './controllers/users';
import auth from './middlewares/auth';
import { ExtendedRequest } from './types';
import connectDB from './db/connect';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';

require('dotenv').config();
// variables

const { PORT = 3000, MONGO_URI = '' } = process.env;
const app = express();

// middleware

app.use(express.json());

// route

app.get('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/users', usersRouter);
app.use('/cards', cardsRouter);

app.get('/', (req: ExtendedRequest, res: Response) => {
  res
    .status(StatusCodes.NOT_FOUND)
    .send('<h1>Страница не найдена</h1>');
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
