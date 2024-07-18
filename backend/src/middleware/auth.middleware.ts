import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

interface DecodedToken extends JwtPayload {
  userId: string;
} 

const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as DecodedToken; // Explicitly cast to DecodedToken
    req.body.userId = decoded.userId; 
    console.log(decoded)
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
