import express from 'express';
import { validateRegister } from '../utils/validation/auth';
import { register } from '../controllers/authController';

const router = express.Router();

// Register Route
router.post('/register', register);

export default router;