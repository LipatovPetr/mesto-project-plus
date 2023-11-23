import mongoose, { Schema, Document } from 'mongoose';
import urlRegex from '../constants';

interface Card extends Document {
  name: string;
  link: string;
  owner: mongoose.Types.ObjectId;
  likes: mongoose.Types.ObjectId[];
  createdAt: Date;
}

const CardSchema = new mongoose.Schema<Card>({
  name: {
    type: String,
    required: [true, 'Card must have a name'],
    minLength: [2, 'Name must be at least 2 characters long'],
    maxLength: [30, 'Name must not exceed 30 characters'],
  },
  link: {
    type: String,
    required: [true, 'Card must have a link'],
    match: [
      // eslint-disable-next-line no-useless-escape
      urlRegex,
      'Invalid url format',
    ],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: [true, 'Card must have an owner'],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    ref: 'user',
    default: [],
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Card>('card', CardSchema);
