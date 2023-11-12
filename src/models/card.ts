import mongoose from "mongoose";

const CardSchema = new mongoose.Schema({
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
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: [true, "Пожалуйста, введите владельца"],
  },
  likes: {
    type: [mongoose.Types.ObjectId],
    default: [],
    required: [true, "Пожалуйста, предоставте ссылку"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Card", CardSchema);
