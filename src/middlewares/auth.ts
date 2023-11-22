import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request';
import { ExtendedRequest } from '../types';

function auth(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new BadRequestError(
      'Authentication failed. Please provide valid credentials.',
    );
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as { _id: string };
  } catch (err) {
    throw new BadRequestError(
      'Authentication failed. Please provide valid credentials.',
    );
  }
  req.user = payload;
  next();
}

export default auth;
