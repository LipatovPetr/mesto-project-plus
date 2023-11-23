import { Response } from 'express';
import BadRequestError from '../errors/bad-request';
import ForbiddenError from '../errors/forbidden';
import NotFoundError from '../errors/not-found';
import UnauthorizedError from '../errors/unauthorized';
import { ExtendedRequest } from '../types';

const errorsHandler = async (
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
};

export default errorsHandler;
