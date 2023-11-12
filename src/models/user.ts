import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Пожалуйста, введите имя"],
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: [true, "Пожалуйста, предоставте информацию о профессии"],
    minLength: 2,
    maxLength: 200,
  },
  avatar: {
    type: String,
    required: [true, "Пожалуйста, предоставте ссылку"],
  },
});

module.exports = mongoose.model("User", UserSchema);
