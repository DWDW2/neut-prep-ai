import express, { Request, Response } from 'express';
import RoadMapController from '../controllers/roadmap.controller';
import RoadMapService from '../services/roadmap.service';
import AuthMiddleware from '../middleware/auth.middleware';
const router = express.Router();
const roadmapService = new RoadMapService();
const roadmapController = new RoadMapController(roadmapService);

router.post('/generate-roadmap', AuthMiddleware, (req: Request, res: Response) => roadmapController.generateRoadmapByUserId(req, res))

router.get('/get-roadmap', AuthMiddleware, (req:Request, res:Response) => roadmapController.getRoadMap(req,res))

export default router;
