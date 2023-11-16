import mongoose, { Document } from 'mongoose';

interface User extends Document {
  name: string;
  about: string;
  avatar: string;
}

const UserSchema = new mongoose.Schema<User>({
  name: {
    type: String,
    required: [true, 'User must have a name'],
    minLength: [2, 'Name must be at least 2 characters long'],
    maxLength: [30, 'Name must not exceed 30 characters'],
  },
  about: {
    type: String,
    required: [true, "User's about field must not be empty"],
    minLength: [2, 'Name must be at least 2 characters long'],
    maxLength: [200, 'Name must not exceed 30 characters'],
  },
  avatar: {
    type: String,
    required: [true, 'User must have a link on avatar'],
  },
});

export default mongoose.model<User>('user', UserSchema);
