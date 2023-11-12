require("dotenv").config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect("mongodb://localhost:27017/mydb");

app.get("/", (req: Request, res: Response) => {
  console.log("URL:", req.url);
  console.log("Метод HTTP:", req.method);
  console.log("Заголовки:", req.headers);
  res.status(200).send("<h1>Страница найдена</h1>");
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
