import mongoose, { Schema } from 'mongoose';

export interface User {
  email: string;
  password: string;
  name: string;
  age: number;
  profileURL: string;
  friends: [string];
  enemies: [string];
}

const userSchema = new Schema<User>({
  email: String,
  password: String,
  name: String,
  age: Number,
  profileURL: String,
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  enemies: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

export const UserModel = mongoose.model<User>('User', userSchema, 'users');
