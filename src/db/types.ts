import mongoose from 'mongoose';

export type MongoConnectionFunction = (_url: string) => Promise<typeof mongoose>;
