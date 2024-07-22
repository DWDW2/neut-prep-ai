import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import AuthMiddleware from '../middleware/auth.middleware';
import CourseService from '../services/course.service';

const router = Router();
const courseService = new CourseService()
const courseController = new CourseController(courseService)

router.post('/generate-lesson-math', AuthMiddleware, (req, res) => courseController.generateLessonMath(req, res));

router.post('/generate-lesson-critical', AuthMiddleware, (req, res) => courseController.generateLessonCritical(req, res));

router.post('/handle-incorrect-themes', AuthMiddleware, (req, res) => courseController.handleIncorrectThemes(req, res));

router.post('/update-xp-and-streak', AuthMiddleware, (req, res) => courseController.updateXpAndStreak(req,res));

router.post('/reset-todays-xp', AuthMiddleware, (req, res) => courseController.resetTodaysXp(req, res));

router.get('/get-user', AuthMiddleware, (req,res) => courseController.fetchAllUserData(req,res))
export default router;
