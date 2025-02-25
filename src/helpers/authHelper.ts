import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

export const generateToken = (userId: Types.ObjectId): string => {
    return jwt.sign({ userId }, process.env.JWT_SECRET!,{ expiresIn: '1d' });
};

export const formatUserResponse = (user: any) => {
    return {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        isVerified: user.isVerified
    };
};