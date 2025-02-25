import { Request, Response, NextFunction } from 'express';

export const validateRegister = (req: Request, res: Response, next: NextFunction): void => {
    const { email, password, first_name, last_name, phone, address } = req.body;
    const errors: string[] = [];

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        errors.push('Valid email is required');
    }

    if (!password || password.length < 6) {
        errors.push('Password must be at least 6 characters long');
    }

    if (!first_name || first_name.trim().length === 0) {
        errors.push('First name is required');
    }

    if (!last_name || last_name.trim().length === 0) {
        errors.push('Last name is required');
    }

    if (!phone || phone.trim().length === 0) {
        errors.push('Phone number is required');
    }

    if (!address || address.trim().length === 0) {
        errors.push('Address is required');
    }

    if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
    }

    next();
};