import { Response } from "express";
import { ExtendedRequest } from "../types";

import User from "../models/user";

export const getAllUsers = async (req: ExtendedRequest, res: Response) => {
  const users = await User.find({});
  res.status(200).json({ users, count: users.length });
};

export const getUser = async (req: ExtendedRequest, res: Response) => {
  const {
    params: { id: userId },
  } = req;
  const user = await User.findOne({ _id: userId });
  if (!user) {
    return res.status(404).json({ error: `No user  found with id ${userId}` });
  }
  res.status(200).json(user);
};

export const createUser = async (req: ExtendedRequest, res: Response) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  const {
    body: { name, about },
  } = req;

  if (!name || !about) {
    return res
      .status(404)
      .json({ error: "Name or About field cannot be empty" });
  }

  const updatedUser = await User.findOneAndUpdate(req.user, req.body, {
    returnDocument: "after",
  });
  res.status(200).json(updatedUser);
};

export const updateAvatar = async (req: ExtendedRequest, res: Response) => {
  const {
    body: { avatar },
  } = req;

  if (!avatar) {
    return res.status(404).json({ error: "Provide an avatar link" });
  }

  const updatedUser = await User.findOneAndUpdate(req.user, req.body, {
    returnDocument: "after",
  });
  res.status(200).json(updatedUser);
};
