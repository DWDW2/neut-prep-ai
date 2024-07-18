import express from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

// User registration
router.post('/register',(req,res) => userController.register(req,res));

// User login
router.post('/login',(req,res) => userController.login(req,res));

// Check if user is authenticated
router.get('/isAuthenticated',(req,res) => userController.isAuthenticated(req,res));

// Get user by ID
router.get('/users/:userId',(req, res) => userController.getUser(req,res));

// Update user by ID
router.put('/users/:userId',(req,res) => userController.updateUser(req,res));

// Generate refresh token
router.post('/users/:userId/refresh-token',(req,res) => userController.generateRefreshToken(req,res));

// Refresh access token
router.post('/refresh-token',(req,res) => userController.refreshAccessToken(req,res));

export default router;
