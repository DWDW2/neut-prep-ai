import { Request, Response } from 'express';
import UserService from '../services/user.service';

export default class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async register(req: Request, res: Response) {
    try {
      const { username, email, password, id_token } = req.body;
      const success = await this.userService.registerUser({ username, email, password, id_token });
      if (success.success) {
        res.status(201).json({ message: 'User registered successfully' });
      } else {
        res.status(400).json({ message: success.message }); // Changed to 400 for bad request
      }
    } catch (error) {
      console.error('Error in register controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password, id_token } = req.body;
      const loginResult = await this.userService.loginUser({ email, password, id_token });
      if (loginResult.success) {
        res.status(200).json({ accessToken: loginResult.accessToken, refreshToken: loginResult.refreshToken, user: loginResult.user }); 
      } else {
        res.status(401).json({ message: loginResult.message });
      }
    } catch (error) {
      console.error('Error in login controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async isAuthenticated(req: Request, res: Response) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
      }
      const isAuthenticated = await this.userService.isAuthenticated(token);
      if (isAuthenticated) {
        res.status(200).json({ message: 'Authenticated' });
      } else {
        res.status(401).json({ message: 'Unauthorized' });
      }
    } catch (error) {
      console.error('Error in isAuthenticated controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const user = await this.userService.getUserById(userId);
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error in getUser controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateUser(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const updatedData = req.body;
      const updatedUser = await this.userService.updateUser(userId, updatedData);
      if (updatedUser) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error in updateUser controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async generateRefreshToken(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const refreshToken = await this.userService.generateRefreshToken(userId);
      if (refreshToken) {
        res.status(200).json({ refreshToken });
      } else {
        res.status(500).json({ message: 'Failed to generate refresh token' });
      }
    } catch (error) {
      console.error('Error in generateRefreshToken controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async refreshAccessToken(req: Request, res: Response) {
    try {
      const refreshToken = req.body.refreshToken;
      const refreshResult = await this.userService.refreshAccessToken(refreshToken);
      if (refreshResult.success) {
        res.status(200).json({ accessToken: refreshResult.token });
      } else {
        res.status(401).json({ message: refreshResult.message });
      }
    } catch (error) {
      console.error('Error in refreshAccessToken controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
