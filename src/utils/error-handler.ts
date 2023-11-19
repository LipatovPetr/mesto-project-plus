import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const handleErrors = (res: Response, error: Error) => {
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
};

export default handleErrors;
