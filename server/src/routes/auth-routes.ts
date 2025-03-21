import { Router, Request, Response } from 'express';
import { User } from '../models/user.js'; 
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body; 

    
    const user = await User.findOne({ username }); 
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    
    const isPasswordCorrect = await bcrypt.compare(password, user.password); 
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid password' });
    }

    
    const payload = { username: user.username }; 
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key', { expiresIn: '1h' }); 

    
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const router = Router();


router.post('/login', login);

export default router;
