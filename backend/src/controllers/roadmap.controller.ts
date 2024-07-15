import { Request, Response } from 'express';
import RoadMapService from '../services/roadmap.service';

export default class RoadMapController {
  private roadmapService: RoadMapService;

  constructor(roadmapService: RoadMapService) {
    this.roadmapService = roadmapService;
  }

  async generateRoadMapCritical(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; // Assuming user object is in req.body.user
      const newRoadMap = await this.roadmapService.generateRoadMapCritical(userId);

      if (newRoadMap) {
        res.status(201).json(newRoadMap);
      } else {
        res.status(500).json({ message: 'Error generating critical roadmap' });
      }
    } catch (error) {
      console.error('Error generating critical roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async generateRoadMapMath(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; // Assuming user object is in req.body.user
      const newRoadMap = await this.roadmapService.generateRoadMapMath(userId);

      if (newRoadMap) {
        res.status(201).json(newRoadMap);
      } else {
        res.status(500).json({ message: 'Error generating math roadmap' });
      }
    } catch (error) {
      console.error('Error generating math roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getMathRoadMap(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; // Assuming user object is in req.body.user
      const roadmap = await this.roadmapService.getMathRoadMap(userId);

      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Math roadmap not found' });
      }
    } catch (error) {
      console.error('Error retrieving math roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getCriticalThinkingRoadMap(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; // Assuming user object is in req.body.user
      const roadmap = await this.roadmapService.getCriticalThinkingRoadMap(userId);

      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Critical thinking roadmap not found' });
      }
    } catch (error) {
      console.error('Error retrieving critical thinking roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async saveRoadMapToDb(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; // Assuming user object is in req.body.user
      const { roadmap, isCritical } = req.body;

      const success = await this.roadmapService.saveRoadMapToDb(roadmap, userId, isCritical);

      if (success) {
        res.status(201).json({ message: 'Roadmap saved successfully' });
      } else {
        res.status(500).json({ message: 'Error saving roadmap' });
      }
    } catch (error) {
      console.error('Error saving roadmap to database:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMapFromDb(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; // Assuming user object is in req.body.user
      const roadmaps = await this.roadmapService.getRoadMapFromDb(userId);

      res.status(200).json(roadmaps);
    } catch (error) {
      console.error('Error retrieving roadmaps from database:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getRoadMapById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const roadmap = await this.roadmapService.getRoadMapById(id);

      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: 'Roadmap not found' });
      }
    } catch (error) {
      console.error('Error retrieving roadmap by ID:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateRoadMap(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { roadmapData } = req.body;

      const updatedRoadMap = await this.roadmapService.updateRoadMap(id, roadmapData);

      if (updatedRoadMap) {
        res.status(200).json(updatedRoadMap);
      } else {
        res.status(500).json({ message: 'Error updating roadmap' });
      }
    } catch (error) {
      console.error('Error updating roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async deleteRoadMap(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const success = await this.roadmapService.deleteRoadMap(id);

      if (success) {
        res.status(204).json({ message: 'Roadmap deleted successfully' });
      } else {
        res.status(500).json({ message: 'Error deleting roadmap' });
      }
    } catch (error) {
      console.error('Error deleting roadmap:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
