import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { MongooseError } from 'mongoose';

const handleErrors = (res: Response, error: unknown) => {
  // Mongoose errors

  if (error instanceof MongooseError) {
    let statusCode: number;
    switch (error.name) {
      case 'ValidationError':
      case 'CastError':
        statusCode = StatusCodes.BAD_REQUEST;
        break;
      case 'DocumentNotFoundError':
        statusCode = StatusCodes.NOT_FOUND;
        break;
      default:
        statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
        break;
    }
    return res.status(statusCode).send({ message: error.message });
  }

  // Errors from Error() constructor

  if (error instanceof Error) {
    return res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ message: error.message });
  }

  // Error messages

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: `${error}` });
};

export default handleErrors;
