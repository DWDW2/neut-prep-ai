import express from 'express';
import CourseController from '../controllers/course.controller';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();
const courseController = new CourseController();

router.post('/generate-math-lesson',AuthMiddleware, (req, res) => courseController.generateLessonMath(req, res));

router.post('/generate-critical-lesson', AuthMiddleware, (req, res) => courseController.generateLessonCritical(req, res));

router.put('/users/:userId/themes',AuthMiddleware, (req, res) => courseController.handleIncorrectThemes(req,res));

router.put('/users/:userId/xp', AuthMiddleware, (req, res) => courseController.updateXpAndStreak(req, res));

router.put('/users/:userId/todays-xp',AuthMiddleware, (req, res) => courseController.resetTodaysXp(req, res));

export default router;
