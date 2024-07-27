import { Request, Response } from 'express';
import RoadMapService from '../services/roadmap.service';

export default class RoadMapController {
  private roadMapService: RoadMapService

  constructor(roadMapService:RoadMapService){
    this.roadMapService = roadMapService
  }

  async generateRoadmapByUserId(req: Request, res: Response) {
    try {
      const {userId, questionType} = req.body
      const roadmap = await this.roadMapService.generateRoadmapByUserId(userId, questionType)
      if(roadmap?.success){
        res.status(200).json(roadmap.roadmap)
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
      const {roadmapId} = req.body
      const roadmap = await this.roadMapService.getRoadmapById(roadmapId)
      if(roadmap.success){
        return res.status(200).json(roadmap.roadmap)
      }else{
        return res.status(500).json({message: roadmap.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message:error})
    }
  }

}
