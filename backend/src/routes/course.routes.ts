import { Router } from 'express';
import CourseController from '../controllers/course.controller';
import AuthMiddleware from '../middleware/auth.middleware';
import CourseService from '../services/course.service';

const router = Router();
const courseService = new CourseService()
const courseController = new CourseController(courseService)

router.post('/generate-lesson', AuthMiddleware, (req, res) => courseController.generateLessonByUserId(req, res))

router.post('/get-lesson', AuthMiddleware, (req, res) => courseController.getLessonById(req, res))

router.post('/handle-incorrect-themes', AuthMiddleware, (req, res) => courseController.handleIncorrectThemes(req, res));

router.post('/handle-best-themes', AuthMiddleware, (req, res) => courseController.updateBestThemes(req, res));

router.post('/update-xp-lesson', AuthMiddleware, (req, res) => courseController.updateXp(req,res));

router.post('/update-streak', AuthMiddleware, (req, res) => courseController.updateStreak(req, res));

router.get('/get-user', AuthMiddleware, (req,res) => courseController.fetchAllUserData(req,res))

router.put('/update-user', AuthMiddleware, (req, res) => courseController.updateUser(req, res));

router.get('/refresh-todays-xp', AuthMiddleware, (req, res) => courseController.refreshTodaysXp(req, res))

router.get('/get-all-users', AuthMiddleware, (req, res) => courseController.getAllUsers(req, res))

router.post('/set-finished', AuthMiddleware, (req, res) => courseController.setFinished(req, res))

router.post('/set-xp-gained', AuthMiddleware, (req, res) => courseController.setXpGained(req, res))

router.post('/handle-next-lesson', AuthMiddleware, (req, res) => courseController.handleNextLesson(req, res))

router.post('/set-user-answers', AuthMiddleware, (req, res) => courseController.setUserAnswers(req, res))

export default router;
