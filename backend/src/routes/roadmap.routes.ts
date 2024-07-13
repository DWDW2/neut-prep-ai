import express from 'express';
import RoadmapController from '../controllers/roadmap.controller';
import RoadmapService from '../services/roadmap.service';

const router = express.Router();

const roadmapService = new RoadmapService();
const roadmapController = new RoadmapController(roadmapService);

router.get('/', (req, res) => roadmapController.getAllRoadmaps(req, res));

router.get('/:id', (req, res) => roadmapController.getRoadmapById(req, res));

router.post('/', (req, res) => roadmapController.generateRoadMap(req, res));

router.put('/:id', (req, res) => roadmapController.updateRoadmap(req, res));

router.delete('/:id', (req, res) => roadmapController.deleteRoadmap(req, res));

export default router;
