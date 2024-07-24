import { Request, Response } from 'express';
import CourseService from '../services/course.service';

export default class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async generateLessonMath(req: Request, res: Response) {
    try {
      const { roadmapId, lessonIndex, sectionIndex } = req.body;
      console.log(req.body)
      const lessonJson = await this.courseService.generateLessonMath(
        roadmapId,
        parseInt(lessonIndex),
        parseInt(sectionIndex)
      );
      res.status(200).json(lessonJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate math lesson' });
    }
  }

  async generateLessonCritical(req: Request, res: Response) {
    try {
      const { roadmapId, lessonIndex, sectionIndex } = req.body;
      console.log(roadmapId, lessonIndex, sectionIndex)
      const lessonJson = await this.courseService.generateLessonCritical(
        roadmapId,
        parseInt(lessonIndex),
        parseInt(sectionIndex)
      );
      res.status(200).json(lessonJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate critical thinking lesson' });
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
}
