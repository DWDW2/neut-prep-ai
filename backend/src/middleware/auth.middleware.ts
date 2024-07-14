import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'

const AuthMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.cookie?.split('=')[1];
    console.log(token)
    console.log(req.headers)
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
        req.body.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
}

export default AuthMiddleware