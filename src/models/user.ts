import mongoose, { Document } from "mongoose";

interface User extends Document {
  name: string;
  about: string;
  avatar: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, "У каждого пользователя должно быть имя"],
    minLength: 2,
    maxLength: 30,
  },
  about: {
    type: String,
    required: [
      true,
      "У каждого пользователя должна быть информация о профессии",
    ],
    minLength: 2,
    maxLength: 200,
  },
  avatar: {
    type: String,
    required: [true, "У каждого пользователя должна быть ссылка на аватар"],
  },
});

export default mongoose.model<User>("user", UserSchema);
