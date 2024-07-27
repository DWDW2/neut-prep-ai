import express from 'express';
import PracticeController from '../controllers/practice.controller';
import PracticeService from '../services/practicetest.service';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();

const practiceService = new PracticeService();
const practiceController = new PracticeController(practiceService);

router.post('/generate-practice-test', AuthMiddleware, (req, res) => practiceController.generatePracticeTestByUserId(req, res));

router.post('/set-score', AuthMiddleware, (req, res) => practiceController.setScoreToPractice(req, res));

router.post('/generate-similar', (req, res) => practiceController.generateSimilarQuestions(req, res))

export default router;
