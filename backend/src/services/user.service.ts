import bcrypt from 'bcrypt';
import { UserModel } from '../models/user.models';
import verifyGoogleToken from '../verifygoogle';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'your-refresh-token-secret';

export default class UserService {
  async registerUser(credentials: { username: string; email: string; password: string, id_token: string }) {
    try {
      if(credentials.id_token){
        const payload = await verifyGoogleToken(credentials.id_token);
        console.log('Google Payload:', payload);
        
        const existingUser = await UserModel.findOne({ email: payload?.email });
        if (existingUser) {
          return {message: 'user already exists', success: false};
        }
        
        const newUser = new UserModel({
          username: payload?.name,
          email: payload?.email,
        });

        await newUser.save();
        return {success: true, message: 'user registered successfully'};
      }
      
      if (!credentials.password) {
        throw new Error('Password is required');
      }
      
      // Generate salt before hashing
      console.log('Generating salt...');
      const salt = await bcrypt.genSalt(10); 
      console.log('Salt generated:', salt);
      
      console.log('Hashing password...');
      const hashedPassword = await bcrypt.hash(credentials.password, salt); 
      console.log('Hashed password:', hashedPassword);
      
      const existingUser = await UserModel.findOne({ email: credentials.email });
      if (existingUser) {
        return {message: 'user already exists', success: false};
      }

      const newUser = new UserModel({
        username: credentials.username,
        email: credentials.email,
        password: hashedPassword,
      });

      await newUser.save();
      return {success: true, message: 'user registered successfully'};
    } catch (error:any) {
      console.error('Error registering user:', error);
      return { message: error.message, success: false };
    }
  }

  async loginUser(credentials: { email: string; password: string, id_token: string}) {
    try {
      if(credentials.id_token){
        const payload = await verifyGoogleToken(credentials.id_token);
        const user = await UserModel.findOne({ email: payload?.email });
        if (!user) {
          return { success: false, message: 'User not found' };
        }
        const accessToken = jwt.sign({ userId: user?._id }, JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ userId: user?._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        return { success: true, accessToken, refreshToken };
      }
      
      const user = await UserModel.findOne({ email: credentials.email });
      if (!user) {
        return { success: false, message: 'User not found' };
      }
      if (!credentials.password || !user.password) {
        return { success: false, message: 'Incorrect password or user not found' };
      }
      
      const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
  
      if (!isPasswordMatch) {
        return { success: false, message: 'Incorrect password' };
      }
  
      const accessToken = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
      const refreshToken = jwt.sign({ userId: user._id }, REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
      return { success: true, accessToken, refreshToken };
    } catch (error) {
      console.error('Error logging in user:', error);
      return { success: false, message: 'Login failed' };
    }
  }

  async isAuthenticated(token: string) {
    try {
      jwt.verify(token, JWT_SECRET);
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

  async updateUser(userId: string, updatedData: any) {
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
