import express from 'express';
import RoadmapController from '../controllers/roadmap.controller';
import RoadmapService from '../services/roadmap.service';
import AuthMiddleware from '../middleware/auth.middleware';
import { Request } from 'express';
interface RequestWithUser extends Request {
    user: {
      _id: string;
    };
  }
const router = express.Router();

const roadmapService = new RoadmapService();
const roadmapController = new RoadmapController(roadmapService);

router.use(AuthMiddleware); 

router.get('/', (req, res) => roadmapController.getRoadMaps(req, res));

router.get('/:id', (req, res) => roadmapController.getRoadMap(req, res));

router.post('/', (req, res) => roadmapController.generateRoadMap(req, res));

router.put('/:id', (req, res) => roadmapController.updateRoadMap(req, res));

router.delete('/:id', (req, res) => roadmapController.deleteRoadMap(req, res));

export default router;
