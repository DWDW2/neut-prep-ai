import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { UserModel } from '../models/user.models';
import { clerk } from '../server';
const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.auth
  if (!auth) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  try {
    const user = await clerk.users.getUser(auth.userId!);
    let userMongo = await UserModel.findOne({id:user.id})
    console.log('got there')
    if (!userMongo) {
      userMongo = new UserModel({
        id: user.id,
        email: user.emailAddresses[0].emailAddress,
        username: user.username ? user.username : user.firstName
      });
      console.log(user)
      console.log('got there2')
      await userMongo.save();
    }
    req.body.userId = userMongo._id; 
    console.log('lets go')
    next()
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export default AuthMiddleware;
