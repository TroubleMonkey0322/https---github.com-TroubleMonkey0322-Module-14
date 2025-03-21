import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {

   
  const token = req.header('Authorization')?.replace('Bearer ', ''); 
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  
  jwt.verify(token, process.env.JWT_SECRET || 'ilovepickles45', (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }

    
    req.user = decoded as JwtPayload; 

   
    next();
  });
};

