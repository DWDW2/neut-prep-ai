import express from 'express';
import UserController from '../controllers/user.controller';

const router = express.Router();
const userController = new UserController();

router.post('/register', userController.register);

router.post('/login', userController.login);

router.get('/isAuthenticated', userController.isAuthenticated);

export default router;
