import mongoose from "mongoose";
import { MongoConnectionFunction } from "./types";

const connectDB: MongoConnectionFunction = (url) => {
  mongoose.set("strictQuery", true);

  const connection = mongoose.connect(url);

  mongoose.connection.on("connected", () => {
    console.log("Connected to MongoDB");
  });

  return connection;
};

export default connectDB;
