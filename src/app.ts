import express from 'express';
import pageNotFound from './controllers/pageNotFound';
import errorsHandler from './middlewares/errorsHandler';
import { requestLogger, errorLogger } from './middlewares/logger';
import auth from './middlewares/auth';
import connectDB from './db/connect';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import signupRouter from './routes/signup';
import signinRouter from './routes/signin';

require('dotenv').config();
const { errors } = require('celebrate');

// variables

const { PORT = 3000, MONGO_URI = '' } = process.env;
const app = express();

// routes & middleware

app.use(requestLogger);
app.use(express.json());

app.use('/', signupRouter);
app.use('/', signinRouter);
app.use(auth);
app.use('/users', usersRouter);
app.use('/cards', cardsRouter);
app.get('*', pageNotFound);

app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

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
