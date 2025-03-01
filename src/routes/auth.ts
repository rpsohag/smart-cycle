import express from 'express';
import { register, login, verifyAuth } from '../controllers/authController';
import { validateRegister } from '../utils/validation/auth';
import { authenticateToken } from '../middlewares/auth';

const router = express.Router();


router.post('/register', validateRegister, register);
router.post('/login', login);
router.get('/verify', authenticateToken, verifyAuth)

export default router;