require("dotenv").config();
import express, { Request, Response } from "express";
import connectDB from "./db/connect";
import usersRouter from "./routes/users";

// variables

const { PORT = 3000, MONGO_URI = "" } = process.env;
const app = express();

// routes

app.use("/users", usersRouter);

app.get("/", (req: Request, res: Response) => {
  res.status(200).send("<h1>Страница найдена, но</h1>");
});

// start app function

const start = async () => {
  try {
    await connectDB(MONGO_URI);
    app.listen(PORT, () => {
      console.log(`App listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

// calls

start();
