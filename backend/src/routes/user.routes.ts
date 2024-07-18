import express from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

const router = express.Router();
const userService = new UserService();
const userController = new UserController(userService);

router.post('/register', (req, res) => userController.register(req, res));

router.post('/login', (req, res) => userController.login(req, res));

router.get('/isAuthenticated', (req, res) => userController.isAuthenticated(req, res));

router.get('/users/:userId', (req, res) => userController.getUser(req, res));

router.put('/users/:userId', (req, res) => userController.updateUser(req, res));

router.post('/users/:userId/refresh-token', (req, res) => userController.generateRefreshToken(req, res));

router.post('/refresh-token', (req, res) => userController.refreshAccessToken(req, res));

export default router;
