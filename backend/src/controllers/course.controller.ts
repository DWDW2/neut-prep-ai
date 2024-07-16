import { Request, Response } from 'express';
import CourseService from '../services/course.service';

export default class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = new CourseService();
  }

  async generateLessonMath(req: Request, res: Response) {
    try {
      const { roadmapId, lessonIndex, unitIndex } = req.body
      const lessonJson = await this.courseService.generateLessonMath(
        roadmapId,
        parseInt(lessonIndex),
        parseInt(unitIndex)
      );
      res.status(200).json(lessonJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate math lesson' });
    }
  }

  async generateLessonCritical(req: Request, res: Response) {
    try {
      const { roadmapId, lessonIndex, unitIndex } = req.body;
      const lessonJson = await this.courseService.generateLessonCritical(
        roadmapId,
        parseInt(lessonIndex),
        parseInt(unitIndex)
      );
      res.status(200).json(lessonJson);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to generate critical thinking lesson' });
    }
  }

  async handleIncorrectThemes(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; 
      const { incorrectThemes } = req.body;
      const success = await this.courseService.handleIncorrectThemes(userId, incorrectThemes);
      if (success) {
        res.status(200).json({ message: 'Incorrect themes updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update incorrect themes' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to handle incorrect themes' });
    }
  }

  async updateXpAndStreak(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; 
      const { points } = req.body;
      const success = await this.courseService.updateXpAndStreak(userId, points);
      if (success) {
        res.status(200).json({ message: 'XP and streak updated successfully' });
      } else {
        res.status(500).json({ error: 'Failed to update XP and streak' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update XP and streak' });
    }
  }

  async resetTodaysXp(req: Request, res: Response) {
    try {
      const { userId } = req.body.user; 
      const success = await this.courseService.resetTodaysXp(userId);
      if (success) {
        res.status(200).json({ message: 'Today\'s XP reset successfully' });
      } else {
        res.status(500).json({ error: 'Failed to reset today\'s XP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to reset today\'s XP' });
    }
  }
}


