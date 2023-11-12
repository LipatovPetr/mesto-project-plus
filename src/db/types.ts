import mongoose from "mongoose";
export type MongoConnectionFunction = (url: string) => Promise<typeof mongoose>;
