import { Request, Response } from 'express';
import PracticeService from '../services/practicetest.service';

export default class RoadMapController {
  private practiceService: PracticeService

  constructor(practiceService:PracticeService){
    this.practiceService = practiceService
  }

  async generatePracticeTestByUserId(req: Request, res: Response) {
    try {
      const {userId} = req.body
      const roadmap = await this.practiceService.generateRoadmapForQuestionType(userId)
      if(roadmap?.success){
        res.status(200).json(roadmap)
      }else{
        res.status(500).json({message: roadmap})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message:error})
    }
  }
  async setScoreToPractice(req:Request, res:Response){
    try {
        const {score, practiceTestId} = req.body
        const result = await this.practiceService.setScoreToPracticeTest(score, practiceTestId)
        if(result?.success){
            res.status(200).json(result)
        }else{
            res.status(500).json({message: result})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
  }

  async generateSimilarQuestions(req:Request, res:Response){
    try {
      const {filepath, mimeType} = req.body
      const lesson = await this.practiceService.generateSimilarQuestion(filepath, mimeType)
      if(lesson.success){
        res.status(200).json(lesson)
      }else{
        res.status(500).json({message: lesson.message})
      }
    } catch (error) {
      console.log(error)
      return res.status(500).json({message:error})
    }
  }
}
