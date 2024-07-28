import { Request, Response } from 'express';
import RoadMapService from '../services/roadmap.service';

export default class RoadMapController {
  private roadMapService: RoadMapService

  constructor(roadMapService:RoadMapService){
    this.roadMapService = roadMapService
  }

  async generateRoadmapByUserId(req: Request, res: Response) {
    try {
      const {userId} = req.body
      const roadmap = await this.roadMapService.generateRoadmapByUserId(userId)
      if(roadmap?.success){
        res.status(200).json({mathRoadmap: roadmap.mathRoadmap, criticalRoadmap: roadmap.criticalRoadmap})
      }else{
        res.status(500).json({message: roadmap?.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message:error})
    }
  }

  async getRoadMap(req:Request, res:Response){
    try {
      const {userId} = req.body
      const roadmap = await this.roadMapService.getRoadmapById(userId)
      if(roadmap.success){
        return res.status(200).json({mathRoadmap: roadmap.mathRoadmap, criticalRoadmap: roadmap.criticalRoadmap})
      }else{
        return res.status(500).json({message: roadmap.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message:error})
    }
  }

}
