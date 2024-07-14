import { Request, Response } from 'express';
import CourseService from '../services/course.service';

const courseService = new CourseService();

export default class CourseController {
  async generateLessonMath(req: Request, res: Response) {
    try {
      const { roadmapId, lessonIndex, unitIndex } = req.body;
      const lessonJson = await courseService.generateLessonMath(
        roadmapId,
        parseInt(lessonIndex),
        parseInt(unitIndex)
      );

      if (lessonJson) {
        res.status(200).json(lessonJson);
      } else {
        res.status(404).json({ message: 'Lesson not found' });
      }
    } catch (error) {
      console.error('Error generating math lesson:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async generateLessonCritical(req: Request, res: Response) {
    try {
      const { roadmapId, lessonIndex, unitIndex } = req.body;
      const lessonJson = await courseService.generateLessonCritical(
        roadmapId,
        parseInt(lessonIndex),
        parseInt(unitIndex)
      );

      if (lessonJson) {
        res.status(200).json(lessonJson);
      } else {
        res.status(404).json({ message: 'Lesson not found' });
      }
    } catch (error) {
      console.error('Error generating critical lesson:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async handleIncorrectThemes(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { incorrectThemes } = req.body;

      const success = await courseService.handleIncorrectThemes(
        userId,
        incorrectThemes
      );

      if (success) {
        res.status(200).json({ message: 'Themes updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error handling incorrect themes:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async updateXpAndStreak(req: Request, res: Response) {
    try {
      const { userId } = req.body;
      const { points } = req.body;

      const success = await courseService.updateXpAndStreak(userId, points);

      if (success) {
        res.status(200).json({ message: 'XP and streak updated successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error updating XP and streak:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async resetTodaysXp(req: Request, res: Response) {
    try {
      const { userId } = req.body;

      const success = await courseService.resetTodaysXp(userId);

      if (success) {
        res.status(200).json({ message: 'Todays XP reset successfully' });
      } else {
        res.status(404).json({ message: 'User not found' });
      }
    } catch (error) {
      console.error('Error resetting todays XP:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}
