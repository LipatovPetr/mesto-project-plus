import mongoose, { Document } from 'mongoose';
import isEmail from 'validator/lib/isEmail';
import bcrypt from 'bcryptjs';

interface User extends Document {
  email: string;
  password: string;
  name: string;
  about: string;
  avatar: string;
}

interface UserModel extends mongoose.Model<User> {
  findUserByCredentials: (
    email: string,
    password: string,
  ) => Promise<User>;
}

interface UserWIthID extends User {
  _id: mongoose.Types.ObjectId;
}

const userSchema = new mongoose.Schema<User, UserModel>({
  email: {
    type: String,
    required: true,
    validate: {
      validator: (value: string) => isEmail(value),
      message: (props) =>
        `${props.value} is not a valid email address.`,
    },
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false,
  },
  name: {
    type: String,
    minLength: [2, 'Name must be at least 2 characters long'],
    maxLength: [30, 'Name must not exceed 30 characters'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minLength: [2, 'Name must be at least 2 characters long'],
    maxLength: [200, 'Name must not exceed 30 characters'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/,
      'Invalid url format',
    ],
    default:
      'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
  },
});

userSchema.static(
  'findUserByCredentials',
  async function findUserByCredentials(
    email: string,
    password: string,
  ) {
    const user: UserWIthID = await this.findOne({ email })
      .select('+password')
      .orFail();
    const matched = await bcrypt.compare(password, user.password);

    if (!matched) {
      throw new Error('Wrong email address or password');
    }
    return user;
  },
);

export default mongoose.model<User, UserModel>('user', userSchema);
