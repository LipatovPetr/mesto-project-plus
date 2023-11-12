import express, { Request, Response } from "express";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("<h1>returns all cards</h1>");
});

router.post("/", (req: Request, res: Response) => {
  res.send("<h1>creates a card</h1>");
});

router.delete("/", (req: Request, res: Response) => {
  res.send("<h1>removes a card</h1>");
});

export default router;
