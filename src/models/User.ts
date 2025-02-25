import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    address: string;
    role: string;
    isVerified: boolean;
}

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
    trim: true
  },
  last_name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);

export default User;
