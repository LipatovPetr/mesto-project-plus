import { Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ExtendedRequest } from '../types';
import handleErrors from '../utils/error-handler';
import User from '../models/user';

export const createUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { name, about, avatar } = req.body;
    const newUser = await User.create({ name, about, avatar });
    return res.status(StatusCodes.OK).json(newUser);
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const getAllUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    const users = await User.find({});
    return res.status(StatusCodes.OK).json({ users, count: users.length });
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const getUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const user = await User.findOne({ _id: userId }).orFail(() => Error('User not found'));
    return res.status(StatusCodes.OK).json(user);
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(req.user, req.body, {
      returnDocument: 'after',
      runValidators: true,
    }).orFail(() => Error('User not found'));

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const updateAvatar = async (req: ExtendedRequest, res: Response) => {
  try {
    const updatedUser = await User.findOneAndUpdate(req.user, req.body, {
      returnDocument: 'after',
      runValidators: true,
    }).orFail(() => Error('User not found'));

    return res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    return handleErrors(res, error);
  }
};
