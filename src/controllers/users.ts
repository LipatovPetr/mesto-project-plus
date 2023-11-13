import express, { Request, Response } from "express";

import User from "../models/user";

export const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.status(200).json({ users, count: users.length });
};

export const getUser = async (req: Request, res: Response) => {
  const {
    params: { id: userId },
  } = req;

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return res.status(404).json({ error: `No user  found with id ${userId}` });
  }

  res.status(200).json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
};
