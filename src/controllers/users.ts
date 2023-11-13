import express, { Request, Response } from "express";

import User from "../models/user";

export const createUser = async (req: Request, res: Response) => {
  const user = await User.create(req.body);
  res.status(200).json(user);
};
