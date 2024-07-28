import { Request, Response } from 'express';
import CourseService from '../services/course.service';


export default class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async generateLessonByUserId(req:Request, res:Response){
    try {
      const {userId, lessonIndex, sectionIndex, roadmapType} = req.body
      const lesson = await this.courseService.generateLessonByUserId(lessonIndex, sectionIndex, roadmapType, userId)
      if(lesson.success){
        res.status(200).json(lesson.lessons)
      }else{
        res.status(500).json({message: lesson.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error})
    }
  }

  async getLessonById(req:Request, res:Response){
    try {
      const {lessonIndex, sectionIndex, roadmapId} = req.body
      const lesson = await this.courseService.getLessonById(lessonIndex, sectionIndex, roadmapId)
      if(lesson.success){
        res.status(200).json(lesson.lesson)
      }else{
        res.status(500).json({message: lesson.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error})  
    }
  }

  async handleIncorrectThemes(req: Request, res: Response) {
    try {
      const { userId } = req.body; 
      const { incorrectThemes } = req.body;
      console.log(req.body)
      const success = await this.courseService.handleIncorrectThemes(userId, incorrectThemes);
      if (success) {
        res.status(200).json({ message: incorrectThemes });
      } else {
        res.status(500).json({ error: 'Failed to update incorrect themes' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to handle incorrect themes' });
    }
  }

  async updateXp(req: Request, res: Response) {
    try {
      const { userId } = req.body; 
      const { points } = req.body;
      const success = await this.courseService.updateXp(userId, points);
      if (success) {
        res.status(200).json({ message: 'XP updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update XP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update XP' });
    }
  }

  async resetTodaysXp(req: Request, res: Response) {
    try {
      const { userId } = req.body; 
      const success = await this.courseService.updateStreak(userId);
      if (success) {
        res.status(200).json({ message: 'Streak updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update streak' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update streak' });
    }
  }

  async refreshTodaysXp(req:Request, res:Response){
    try {
      const { userId } = req.body; 
      const success = await this.courseService.refreshTodaysXp(userId)
      if (success) {
        res.status(200).json({ message: 'XP updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update XP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update XP' });
    }
  }

  async fetchAllUserData(req:Request, res:Response) {
    try {
      const {userId} = req.body
      const user = await this.courseService.fetchAllUserData(userId)
      res.status(200).json(user)
    } catch (error:any) {
      console.log(error)
      res.status(500).json({message: error.message})
    }
  }

  async updateUser(req:Request, res:Response) {
    try {
      const {userId, tested} = req.body
      await this.courseService.updateUser(userId, tested)
    } catch (error:any) {
      console.log(error)
      res.status(500).json({message: error?.message})
    }
  }

  async updateBestThemes(req:Request, res:Response){
    try {
      const {userId, bestThemes} = req.body
      await this.courseService.updateBestThemes(userId, bestThemes)      
    } catch (error:any) {
      console.log(error)
      res.status(500).json({message: error?.message})
    }
  }

  async getAllUsers(req:Request, res:Response){
    try {
      const users = await this.courseService.getAllUsers()
      res.status(200).json(users)
    }catch(err:any){
      console.log(err)
      res.status(500).json({message: err?.message})
    }
  }

  async setFinished(req:Request, res:Response){
    try {
      const {lessonIndex, sectionIndex, roadmapId} = req.body
      const lesson = await this.courseService.setFinished(lessonIndex, sectionIndex, roadmapId)
      if(lesson.success){
        res.status(200).json(lesson)
      }else{
        res.status(500).json({message: lesson.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error})  
    }
  }

  async setXpGained(req:Request, res:Response){
    try {
      const {lessonIndex, sectionIndex, roadmapId, xp} = req.body
      const lesson = await this.courseService.setXpGained(lessonIndex, sectionIndex, roadmapId, xp)
      if(lesson.success){
        res.status(200).json(lesson)
      }else{
        res.status(500).json({message: lesson.message})
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({message: error})  
    }
  }
}
