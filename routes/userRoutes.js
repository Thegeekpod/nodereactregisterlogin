import express from 'express';
import { getUserProfile, getUserProfileedit, updateUserPassword } from '../controllers/userController.js';
import { authenticateToken } from '../utils/jwt.js';

const router = express.Router();

router.get('/profile', authenticateToken, getUserProfile);
router.post('/edit', authenticateToken, getUserProfileedit);
router.post('/editpassword',authenticateToken, updateUserPassword);




export default router;
