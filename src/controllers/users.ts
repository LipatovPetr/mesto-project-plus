import { Response } from "express";
import { ExtendedRequest } from "../types";
import User from "../models/user";

export const createUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const { name, about, avatar } = req.body;

    if (!name || !about || !avatar) {
      res.status(400).json({ error: "Invalid data for user creation" });
    }

    const newUser = await User.create({ name, about, avatar });
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const getAllUsers = async (req: ExtendedRequest, res: Response) => {
  try {
    const users = await User.find({});
    res.status(200).json({ users, count: users.length });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const getUser = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: userId },
    } = req;
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ error: `No user found with id ${userId}` });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const updateUser = async (req: ExtendedRequest, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const updateAvatar = async (req: ExtendedRequest, res: Response) => {
  try {
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
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
