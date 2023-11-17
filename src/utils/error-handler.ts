import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import mongoose from 'mongoose';

const handleErrors = (res: Response, error: unknown) => {
  if (error instanceof Error) {
    let statusCode: number;
    switch (error.name) {
      case 'ValidationError':
      case 'CastError':
      case 'CastError':
      case 'User not found':
      case 'Card not found':
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
  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: error });
};

export default handleErrors;
