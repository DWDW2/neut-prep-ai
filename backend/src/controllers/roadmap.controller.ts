import RoadMapService from "../services/roadmap.service";
import { Request, Response } from "express";

export default class RoadMapController {
  private roadMapService: RoadMapService;

  constructor(roadMapService: RoadMapService) {
    this.roadMapService = roadMapService;
  }

  async generateRoadMap(req: Request, res: Response) {
    try {
      const roadmapData = await this.roadMapService.generateRoadMap();
      const success = await this.roadMapService.saveRoadMapToDb(roadmapData);
      if (success) {
        res.status(201).json({ message: "Roadmap created successfully" });
      } else {
        res.status(500).json({ message: "Error creating roadmap" });
      }
    } catch (error) {
      console.error("Error creating roadmap:", error);
      res.status(500).json({ message: "Error creating roadmap" });
    }
  }

  async getAllRoadmaps(req: Request, res: Response) {
    try {
      const roadmaps = await this.roadMapService.getRoadMapFromDb();
      res.status(200).json(roadmaps);
    } catch (error) {
      console.error("Error retrieving roadmaps:", error);
      res.status(500).json({ message: "Error retrieving roadmaps" });
    }
  }

  async getRoadmapById(req: Request, res: Response) {
    try {
      const roadmapId = req.params.id;
      const roadmap = await this.roadMapService.getRoadMapById(roadmapId);
      if (roadmap) {
        res.status(200).json(roadmap);
      } else {
        res.status(404).json({ message: "Roadmap not found" });
      }
    } catch (error) {
      console.error("Error retrieving roadmap by ID:", error);
      res.status(500).json({ message: "Error retrieving roadmap" });
    }
  }

  async updateRoadmap(req: Request, res: Response) {
    try {
      const roadmapId = req.params.id;
      const updatedRoadmapData = req.body;
      const updatedRoadmap = await this.roadMapService.updateRoadMap(
        roadmapId,
        updatedRoadmapData
      );
      if (updatedRoadmap) {
        res.status(200).json(updatedRoadmap);
      } else {
        res.status(404).json({ message: "Roadmap not found" });
      }
    } catch (error) {
      console.error("Error updating roadmap:", error);
      res.status(500).json({ message: "Error updating roadmap" });
    }
  }

  async deleteRoadmap(req: Request, res: Response) {
    try {
      const roadmapId = req.params.id;
      const success = await this.roadMapService.deleteRoadMap(roadmapId);
      if (success) {
        res.status(204).send(); // No content response for successful deletion
      } else {
        res.status(404).json({ message: "Roadmap not found" });
      }
    } catch (error) {
      console.error("Error deleting roadmap:", error);
      res.status(500).json({ message: "Error deleting roadmap" });
    }
  }
}
