import { Response } from "express";
import { ExtendedRequest } from "../types";
import { StatusCodes } from "http-status-codes";
import Card from "../models/card";

export const createCard = async (req: ExtendedRequest, res: Response) => {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: "Invalid data for card creation" });
    }

    const reqBodyWithUserID = { owner: req.user?._id, ...req.body };
    const newCard = await Card.create(reqBodyWithUserID);
    res.status(StatusCodes.OK).json(newCard);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};

export const getAllCards = async (req: ExtendedRequest, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(StatusCodes.OK).json({ cards, count: cards.length });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};

export const deleteCard = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    const cards = await Card.findByIdAndDelete(cardID);
    res.status(StatusCodes.OK).json({});
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
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
      { new: true }
    );

    res.status(StatusCodes.OK).json(card);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
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
      { new: true }
    );

    res.status(StatusCodes.OK).json(card);
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: `${error}` });
  }
};
