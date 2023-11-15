import mongoose, { Schema, Document } from "mongoose";

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
    required: [true, "Пожалуйста, введите название"],
    minLength: 2,
    maxLength: 30,
  },
  link: {
    type: String,
    required: [true, "Пожалуйста, предоставте информацию о профессии"],
  },
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Пожалуйста, введите владельца"],
  },
  likes: {
    type: [Schema.Types.ObjectId],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model<Card>("card", CardSchema);
