import { Request, Response } from 'express';
import RoadMapService from '../services/roadmap.service';

interface RequestWithUser extends Request {
  body: {
    user?:{
      userId: string;
    }
  };
}

export default class RoadMapController {
  private roadmapService: RoadMapService;

  constructor(roadmapService: RoadMapService) {
    this.roadmapService = roadmapService;
  }

  async generateRoadMapCritical(req: RequestWithUser, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = req.body.user.userId;
      const roadmap = await this.roadmapService.generateRoadMapCritical(userId);
      if(roadmap === null){
        res.status(500).json({message: 'User doesnt existts'})
      }
      res.status(201).json(roadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      res.status(500).json({ message: 'Failed to generate roadmap' });
    }
  }

  async generateRoadMapMath(req: RequestWithUser, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = req.body.user.userId;
      const roadmap = await this.roadmapService.generateRoadMapMath(userId);
      if(roadmap === null){
        res.status(500).json({message: 'User doesnt existts'})
      }
      res.status(201).json(roadmap);
    } catch (error) {
      console.error('Error generating roadmap:', error);
      res.status(500).json({ message: 'Failed to generate roadmap' });
    }
  }

  async saveRoadMap(req: RequestWithUser, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = req.body.user.userId;
      const roadmapData = req.body;
      const isCritical = req.query.isCritical === 'true'; 
      const success = await this.roadmapService.saveRoadMapToDb(roadmapData, userId, isCritical);
      if (success) {
        res.status(201).json({ message: 'Roadmap saved successfully' });
      } else {
        res.status(500).json({ message: 'Failed to save roadmap' });
      }
    } catch (error) {
      console.error('Error saving roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMaps(req: RequestWithUser, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = req.body.user.userId;
      const roadmaps = await this.roadmapService.getRoadMapFromDb(userId);
      res.status(200).json(roadmaps);
    } catch (error) {
      console.error('Error retrieving roadmaps:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMap(req: RequestWithUser, res: Response) {
    try {
      const roadmapId = req.params.id;
      const roadmap = await this.roadmapService.getRoadMapById(roadmapId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error retrieving roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateRoadMap(req: RequestWithUser, res: Response) {
    try {
      const roadmapId = req.params.id;
      const roadmapData = req.body;
      const updatedRoadMap = await this.roadmapService.updateRoadMap(roadmapId, roadmapData);
      if (updatedRoadMap) {
        res.status(200).json(updatedRoadMap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error updating roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteRoadMap(req: RequestWithUser, res: Response) {
    try {
      const roadmapId = req.params.id;
      const success = await this.roadmapService.deleteRoadMap(roadmapId);
      if (success) {
        res.status(204).send(); 
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
