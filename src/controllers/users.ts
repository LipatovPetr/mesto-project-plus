import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../types';
import handleErrors from '../utils/error-handler';
import User from '../models/user';

export const login = async (req: ExtendedRequest, res: Response) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign({ _id: user._id }, 'some-secret-key', {
      expiresIn: 3600,
    });

    res.cookie('jwt', token, {
      httpOnly: true,
    });

    return res
      .status(StatusCodes.OK)
      .json({ message: 'Authentication successful' });
  } catch (error) {
    return handleErrors(res, error as Error);
  }
};

export const createUser = async (
  req: ExtendedRequest,
  res: Response,
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
  } catch (error) {
    return handleErrors(res, error as Error);
  }
};

export const getAllUsers = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    const users = await User.find({});
    return res
      .status(StatusCodes.OK)
      .json({ users, count: users.length });
  } catch (error) {
    return handleErrors(res, error as Error);
  }
};

export const getUser = async (
  req: ExtendedRequest,
  res: Response,
) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const user = await User.findOne({ _id: userId }).orFail(() =>
      Error(),
    );
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return handleErrors(res, error as Error);
  }
};

export const updateUser = async (
  req: ExtendedRequest,
  res: Response,
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
    return handleErrors(res, error as Error);
  }
};

export const updateAvatar = async (
  req: ExtendedRequest,
  res: Response,
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
    return handleErrors(res, error as Error);
  }
};
