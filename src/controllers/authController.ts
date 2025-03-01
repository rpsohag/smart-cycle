import { Request, Response } from 'express';
import bcrypt from "bcryptjs";
import User from '../models/User';
import { Types } from 'mongoose';
import { formatUserResponse, generateToken, hashPassword } from '../helpers/authHelper';
import jwt from 'jsonwebtoken';

export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { first_name, last_name, email, password } = req.body;

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

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            res.status(401).json({ message: 'Invalid credentials' });
            return;
        }

        const token = generateToken(user._id as Types.ObjectId);

        res.cookie("accessToken", token, {
            httpOnly: true,
            secure: false,
            sameSite: "strict",
            path: "/",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          });

          
        res.status(200).json({
            message: 'Login successful',
            token,
            data: formatUserResponse(user)
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

export const verifyAuth = async (req: Request, res: Response): Promise<void> => {
    try {
        const token = req.cookies.accessToken;
        if (!token) {
          res.status(401).json({ message: 'Not authenticated' });
          return;
        }
    
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string };
        const user = await User.findById(decoded.userId);
        if (!user) {
          res.status(401).json({ message: 'Not authenticated' });
          return;
        }
    
        res.status(200).json({ message: 'Authenticated', data: formatUserResponse(user) });
      } catch (error) {
        console.error('Auth check error:', error);
        res.status(500).json({ message: 'Server error' });
      }
};