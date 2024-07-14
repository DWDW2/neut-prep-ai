import { UserModel, UserType } from '../models/user.models';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret'; 

export default class UserService {

  async registerUser(userData: { username: string; email: string; password: string }) {
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 10);

      const newUser = new UserModel({
        username: userData.username,
        email: userData.email,
        password: hashedPassword,
      });

      await newUser.save();
      return true;
    } catch (error) {
      console.error('Error registering user:', error);
      return false;
    }
  }

  async loginUser(credentials: { email: string; password: string }) {
    try {
      const user = await UserModel.findOne({ email: credentials.email });

      if (!user) {
        return { success: false, message: 'UserModel not found' };
      }

      const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);

      if (!isPasswordMatch) {
        return { success: false, message: 'Incorrect password' };
      }

      const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

      return { success: true, token };
    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false, message: 'Login failed' };
    }
  }

  async isAuthenticated(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
      return true;
    } catch (error) {
      return false;
    }
  }

  async getUserById(userId: string) {
    try {
      const user = await UserModel.findById(userId);
      return user;
    } catch (error) {
      console.error('Error getting user by ID:', error);
      return null;
    }

  }

    async updateUser(userId: string, updatedData: Partial<UserType>) {
      try {
        const user = await UserModel.findById(userId);
        if (!user) {
          return null;
        }
        Object.assign(user, updatedData);
        await user.save();
        return user;
      } catch (error) {
        console.error('Error updating user:', error);
        return null;
      }
    }
    
  async generateRefreshToken(userId: string) {
    try {
      const refreshToken = jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' }); 
      return refreshToken;
    } catch (error) {
      console.error('Error generating refresh token:', error);
      return null;
    }
  }

  async refreshAccessToken(refreshToken: string) {
    try {
      const decoded = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: string };
      const user = await UserModel.findById(decoded.userId);

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      
      return { success: true, token: accessToken };
    } catch (error) {
      console.error('Error refreshing access token:', error);
      return { success: false, message: 'Refresh token invalid' };
    }
  }

}
