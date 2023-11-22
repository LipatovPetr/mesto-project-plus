import { StatusCodes } from 'http-status-codes';
import { Response, NextFunction } from 'express';
import BadRequestError from '../errors/bad-request';

import { ExtendedRequest } from '../types';
import Card from '../models/card';

export const createCard = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const reqBodyWithUserID = { owner: req.user?._id, ...req.body };
    const newCard = await Card.create(reqBodyWithUserID);
    return res.status(StatusCodes.OK).json(newCard);
  } catch (error) {
    return next(error);
  }
};

export const getAllCards = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const cards = await Card.find({});
    return res
      .status(StatusCodes.OK)
      .json({ cards, count: cards.length });
  } catch (error) {
    return next(error);
  }
};

export const deleteCard = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: cardID },
      user,
    } = req;
    const userID = user!._id;
    const card = await Card.findById(cardID).orFail();

    if (card.owner.toString() !== userID) {
      throw new BadRequestError(
        'You do not have permission to delete this card.',
      );
    }
    return res.status(StatusCodes.OK).json({});
  } catch (error) {
    return next(error);
  }
};

export const addLike = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    const card = await Card.findByIdAndUpdate(
      cardID,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    ).orFail();

    return res.status(StatusCodes.OK).json(card);
  } catch (error) {
    return next(error);
  }
};

export const removeLike = async (
  req: ExtendedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    const card = await Card.findByIdAndUpdate(
      cardID,
      { $pull: { likes: req.user?._id } },
      { new: true },
    ).orFail();

    return res.status(StatusCodes.OK).json(card);
  } catch (error) {
    return next(error);
  }
};
