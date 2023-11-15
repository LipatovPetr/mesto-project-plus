import { Response } from "express";
import { ExtendedRequest } from "../types";
import { StatusCodes } from "http-status-codes";
import User from "../models/user";

export const createUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { name, about, avatar } = req.body;

    if (!name || !about || !avatar) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid data for user creation" });
    }

    const newUser = await User.create({ name, about, avatar });
    res.status(StatusCodes.OK).json(newUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};

export const getAllUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    const users = await User.find({});
    res.status(StatusCodes.OK).json({ users, count: users.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};

export const getUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ error: `No user found with id ${userId}` });
    }
    res.status(StatusCodes.OK).json(user);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      body: { name, about },
    } = req;

    if (!name || !about) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Name or About field cannot be empty" });
    }

    const updatedUser = await User.findOneAndUpdate(req.user, req.body, {
      returnDocument: "after",
    });
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};

export const updateAvatar = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      body: { avatar },
    } = req;

    if (!avatar) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Provide an avatar link" });
    }

    const updatedUser = await User.findOneAndUpdate(req.user, req.body, {
      returnDocument: "after",
    });
    res.status(StatusCodes.OK).json(updatedUser);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};
