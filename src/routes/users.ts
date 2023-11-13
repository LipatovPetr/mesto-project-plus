import express, { Request, Response } from "express";
import { createUser, getAllUsers, getUser } from "../controllers/users";

const router = express.Router();

router.get("/", getAllUsers).post("/", createUser);
router.get("/:id", getUser);

export default router;
