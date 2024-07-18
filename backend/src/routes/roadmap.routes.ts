import express, { Request, Response } from 'express';
import RoadMapController from '../controllers/roadmap.controller';
import RoadMapService from '../services/roadmap.service';
import AuthMiddleware from '../middleware/auth.middleware';
const router = express.Router();
const roadmapService = new RoadMapService();
const roadmapController = new RoadMapController(roadmapService);

router.get('/critical/generate-and-get-roadmapCritical', AuthMiddleware, (req:Request, res:Response) => roadmapController.getRoadMapCriticalByUserId(req,res));

router.get('/math/generate-and-get-roadmapMath', AuthMiddleware, (req:Request, res:Response) =>roadmapController.getRoadMapMathByUserId(req,res));

router.get('/math/:userId', AuthMiddleware, (req:Request, res:Response) => roadmapController.getMathRoadMap(req,res));

router.get('/critical/:userId', AuthMiddleware, (req:Request, res:Response) => roadmapController.getCriticalThinkingRoadMap(req,res));

router.post('/:userId', AuthMiddleware,  (req:Request, res:Response) => roadmapController.saveRoadMapToDb(req,res));

router.get('/:userId', AuthMiddleware, (req:Request, res:Response) =>roadmapController.getRoadMapFromDb(req,res));

router.get('/id/:roadmapId', AuthMiddleware, (req:Request, res:Response) => roadmapController.getRoadMapById(req,res));

router.put('/id/:roadmapId', AuthMiddleware, (req:Request, res:Response) => roadmapController.updateRoadMap(req,res));

router.delete('/id/:roadmapId', AuthMiddleware, (req:Request, res:Response) => roadmapController.deleteRoadMap(req,res));

export default router;
