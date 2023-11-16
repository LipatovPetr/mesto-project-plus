import { StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import { ExtendedRequest } from '../types';
import Card from '../models/card';
import handleErrors from '../utils/error-handler';

export const createCard = async (req: ExtendedRequest, res: Response) => {
  try {
    const reqBodyWithUserID = { owner: req.user?._id, ...req.body };
    const newCard = await Card.create(reqBodyWithUserID);
    return res.status(StatusCodes.OK).json(newCard);
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const getAllCards = async (req: ExtendedRequest, res: Response) => {
  try {
    const cards = await Card.find({});
    return res.status(StatusCodes.OK).json({ cards, count: cards.length });
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const deleteCard = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    await Card.findByIdAndDelete(cardID).orFail(() => Error('Card not found'));
    return res.status(StatusCodes.OK).json({});
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const addLike = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    const card = await Card.findByIdAndUpdate(
      cardID,
      { $addToSet: { likes: req.user?._id } },
      { new: true },
    ).orFail(() => Error('Card not found'));

    return res.status(StatusCodes.OK).json(card);
  } catch (error) {
    return handleErrors(res, error);
  }
};

export const removeLike = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    const card = await Card.findByIdAndUpdate(
      cardID,
      { $pull: { likes: req.user?._id } },
      { new: true },
    ).orFail(() => Error('Card not found'));

    return res.status(StatusCodes.OK).json(card);
  } catch (error) {
    return handleErrors(res, error);
  }
};
