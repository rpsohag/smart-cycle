import { Request, Response } from 'express';
import User from '../models/User';
import { Types } from 'mongoose';
import { formatUserResponse, generateToken, hashPassword } from '../helpers/authHelper';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, first_name, last_name, phone, address } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            res.status(400).json({ message: 'User already exists' });
            return;
        }

        const hashedPassword = await hashPassword(password);
        const user = new User({
            first_name,
            last_name,
            email,
            password: hashedPassword,
            phone,
            address,
            role: 'user',
            isVerified: false
        });

        await user.save();

        const token = generateToken(user._id as Types.ObjectId);
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: formatUserResponse(user)
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};