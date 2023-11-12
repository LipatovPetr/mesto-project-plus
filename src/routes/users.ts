import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>returns all users</h1>");
});

router.get("/:userId", (req: Request, res: Response) => {
  res.send("<h1>returns user by id</h1>");
});

router.post("/", (req: Request, res: Response) => {
  res.send("<h1>creates user</h1>");
});

export default router;
