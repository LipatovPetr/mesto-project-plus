import { Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import NotFoundError from '../errors/not-found';
import BadRequestError from '../errors/bad-request';
import { ExtendedRequest } from '../types';
import User from '../models/user';

export const login = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
      expiresIn: '7d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
    });
    return res
      .status(StatusCodes.OK)
      .json({ message: 'Authentication successful' });
  } catch (error) {
    return next(error);
  }
};

export const createUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      email,
      password: unhashedPassword,
      name,
      about,
      avatar,
    } = req.body;

    const password = await bcrypt.hash(unhashedPassword, 10);

    const user = await User.create({
      email,
      password,
      name,
      about,
      avatar,
    });

    return res.status(StatusCodes.OK).json(user);
  } catch (error: any) {
    if ('code' in error && error.code === 11000) {
      return next(new BadRequestError('Ops! User already exists.'));
    }
    return next(error);
  }
};

export const getAllUsers = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await User.find({});
    return res
      .status(StatusCodes.OK)
      .json({ users, count: users.length });
  } catch (error) {
    return next(error);
  }
};

export const getUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await User.findOne({ _id: req.user?._id }).orFail();

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const getUserByID = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const user = await User.findOne({ _id: userId }).orFail();

    if (!user) {
      throw new NotFoundError(
        `No user found with the provided id: ${userId}`,
      );
    }

    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return next(error);
  }
};

export const updateUser = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      req.user,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ).orFail();
    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};

export const updateAvatar = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      req.user,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true,
      },
    ).orFail();

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    return next(error);
  }
};
