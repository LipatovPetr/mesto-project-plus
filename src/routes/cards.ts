import express, { Request, Response } from "express";
import {
  createCard,
  getAllCards,
  deleteCard,
  addLike,
  removeLike,
} from "../controllers/cards";

const router = express.Router();

router.route("/").get(getAllCards).post(createCard);
router.delete("/:id", deleteCard);
router.route("/:id/likes").put(addLike).delete(removeLike);

export default router;
