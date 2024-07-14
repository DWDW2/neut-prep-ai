import express from 'express';
import RoadMapController from '../controllers/roadmap.controller';
import RoadMapService from '../services/roadmap.service';
import AuthMiddleware from '../middleware/auth.middleware';

const router = express.Router();

const roadmapService = new RoadMapService();
const roadmapController = new RoadMapController(roadmapService);

router.post('/critical', AuthMiddleware, (req, res) => {
  roadmapController.generateRoadMapCritical(req, res);
});

router.post('/math', AuthMiddleware, (req, res) => {
  roadmapController.generateRoadMapMath(req, res);
});

router.post('/', AuthMiddleware, (req, res) => {
  roadmapController.saveRoadMap(req, res);
});

router.get('/', AuthMiddleware, (req, res) => {
  roadmapController.getRoadMaps(req, res);
});

router.get('/:id', AuthMiddleware, (req, res) => {
  roadmapController.getRoadMap(req, res);
});

router.put('/:id', AuthMiddleware, (req, res) => {
  roadmapController.updateRoadMap(req, res);
});

router.delete('/:id', AuthMiddleware, (req, res) => {
  roadmapController.deleteRoadMap(req, res);
});

export default router;
