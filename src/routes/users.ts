import express, { Request, Response } from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  updateUser,
  updateAvatar,
} from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);
router.get("/:id", getUser);
router.patch("/me", updateUser);
router.patch("/me/avatar", updateAvatar);

export default router;
