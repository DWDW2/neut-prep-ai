import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
const authMiddleware = (req:Request, res:Response, next:NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).send('Unauthorized');
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded;
    next();
  } catch (error) {
    return res.status(401).send('Unauthorized');
  }
};

export default authMiddleware;
