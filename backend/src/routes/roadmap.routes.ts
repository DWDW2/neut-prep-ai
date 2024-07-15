import express from 'express';
import RoadMapController from '../controllers/roadmap.controller';
import RoadMapService from '../services/roadmap.service';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();
const roadmapService = new RoadMapService();
const roadmapController = new RoadMapController(roadmapService);

router.post('/generate-critical-roadmap', AuthMiddleware, (req, res) => roadmapController.generateRoadMapCritical(req,res));

router.post('/generate-math-roadmap',AuthMiddleware,  (req, res) => roadmapController.generateRoadMapMath(req, res));

router.get('/users/:userId/math-roadmap',AuthMiddleware, (req, res) => roadmapController.getMathRoadMap(req,res));

router.get('/users/:userId/critical-roadmap',AuthMiddleware, (req, res) => roadmapController.getCriticalThinkingRoadMap(req, res));


router.post('/roadmaps',AuthMiddleware, (req, res) => roadmapController.saveRoadMapToDb(req, res));

router.get('/users/:userId/roadmaps', AuthMiddleware,  (req, res) => roadmapController.getRoadMapFromDb(req, res));

router.get('/roadmaps/:id',AuthMiddleware, (req, res) => roadmapController.getRoadMapById(req, res));

router.put('/roadmaps/:id',AuthMiddleware, (req, res) => roadmapController.updateRoadMap(req, res));

router.delete('/roadmaps/:id', roadmapController.deleteRoadMap);

export default router;
