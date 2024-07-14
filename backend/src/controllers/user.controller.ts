import { Request, Response } from 'express';
import UserService from '../services/user.service';
import { UserModel } from '../models/user.models';

const userService = new UserService();

export default class UserController {
  async register(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
          return res.status(409).json({ message: 'User already exists' });
        }
      const success = await userService.registerUser({ username, email, password });

      if (success) {
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        res.status(500).json({ message: 'Failed to register user' });
      }
    } catch (error) {
      console.error('Error in register:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const loginResult = await userService.loginUser({ email, password });

      if (loginResult.success) {
        res.cookie('token', loginResult.token, { httpOnly: true });
        res.status(200).json({ token: loginResult.token })
      } else {
        res.status(401).json({ message: loginResult.message });
      }
    } catch (error) {
      console.error('Error in login:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async isAuthenticated(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];

      if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const isAuthenticated = await userService.isAuthenticated(token);

      if (isAuthenticated) {
        res.status(200).json({ message: 'Authenticated' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error in isAuthenticated:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
