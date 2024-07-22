import { Request, Response } from 'express';
import RoadMapService from '../services/roadmap.service';

export default class RoadMapController {
  private roadMapService: RoadMapService

  constructor(roadMapService:RoadMapService){
    this.roadMapService = roadMapService
  }
  async getRoadMapCriticalByUserId(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      console.log(userId)
      const roadmap = await this.roadMapService.getRoadMapCriticalByUserId(userId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in getRoadMapCriticalByUserId controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMapMathByUserId(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      const roadmap = await this.roadMapService.getRoadMapMathByUserId(userId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in getRoadMapMathByUserId controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getMathRoadMap(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      const roadmap = await this.roadMapService.getMathRoadMap(userId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in getMathRoadMap controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCriticalThinkingRoadMap(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      const roadmap = await this.roadMapService.getCriticalThinkingRoadMap(userId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in getCriticalThinkingRoadMap controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async saveRoadMapToDb(req: Request, res: Response) {
    try {
      const userId = req.body.userId;
      const roadmapData = req.body;
      const isCritical = req.query.isCritical === 'true';
      const success = await this.roadMapService.saveRoadMapToDb(roadmapData, userId, isCritical);
      if (success) {
        res.status(201).json({ message: 'Roadmap saved successfully' });
      } else {
        res.status(500).json({ message: 'Failed to save roadmap' });
      }
    } catch (error) {
      console.error('Error in saveRoadMapToDb controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMapFromDb(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const roadmaps = await this.roadMapService.getRoadMapFromDb(userId);
      res.status(200).json(roadmaps);
    } catch (error) {
      console.error('Error in getRoadMapFromDb controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMapById(req: Request, res: Response) {
    try {
      const roadmapId = req.params.roadmapId;
      const roadmap = await this.roadMapService.getRoadMapById(roadmapId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in getRoadMapById controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateRoadMap(req: Request, res: Response) {
    try {
      const roadmapId = req.params.roadmapId;
      const roadmapData = req.body;
      const updatedRoadMap = await this.roadMapService.updateRoadMap(roadmapId, roadmapData);
      if (updatedRoadMap) {
        res.status(200).json(updatedRoadMap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in updateRoadMap controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteRoadMap(req: Request, res: Response) {
    try {
      const roadmapId = req.params.roadmapId;
      const success = await this.roadMapService.deleteRoadMap(roadmapId);
      if (success) {
        res.status(200).json({ message: 'Roadmap deleted successfully' });
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error in deleteRoadMap controller:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
