import jwt from 'jsonwebtoken';
import { Response, NextFunction } from 'express';
import { ExtendedRequest } from '../types';

function auth(
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key') as { _id: string };
    console.log(payload);
  } catch (err) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }
  req.user = payload;
  next();
  return null;
}

export default auth;
