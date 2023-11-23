import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import UnauthorizedError from '../errors/unauthorized';
import { ExtendedRequest } from '../types';

function auth(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(
      'Authentication failed. Please provide valid credentials.',
    );
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (error) {
    return next(
      new UnauthorizedError('Authentication failed: Invalid token.'),
    );
  }
  req.user = payload as { _id: string };
  return next();
}

export default auth;
