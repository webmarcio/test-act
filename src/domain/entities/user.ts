import { Schema, model } from 'mongoose';

export interface UserEntity {
  _id?: string;
  email?: string;
  token?: string;
  password?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<UserEntity>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: false },
}, {
  timestamps: true,
});

const UserModel = model<UserEntity>('User', userSchema);

export default UserModel;