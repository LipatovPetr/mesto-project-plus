import { Response } from "express";
import { ExtendedRequest } from "../types";
import Card from "../models/card";

export const createCard = async (req: ExtendedRequest, res: Response) => {
  try {
    const { name, link } = req.body;

    if (!name || !link) {
      res.status(400).json({ error: "Invalid data for card creation" });
    }

    const reqBodyWithUserID = { owner: req.user?._id, ...req.body };
    const newCard = await Card.create(reqBodyWithUserID);
    res.status(200).json(newCard);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const getAllCards = async (req: ExtendedRequest, res: Response) => {
  try {
    const cards = await Card.find({});
    res.status(200).json({ cards, count: cards.length });
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};

export const deleteCard = async (req: ExtendedRequest, res: Response) => {
  try {
    const {
      params: { id: cardID },
    } = req;

    const cards = await Card.findByIdAndDelete(cardID);
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: `${error}` });
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

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
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

    res.status(200).json(card);
  } catch (error) {
    res.status(500).json({ error: `${error}` });
  }
};
