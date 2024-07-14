import { Request, Response } from 'express';
import CourseService from '../services/course.service';

interface RequestWithUser extends Request {
  body:{
    user?:{
        userId: string;
    }
  }
}

export default class CourseController {
  private courseService: CourseService;

  constructor(courseService: CourseService) {
    this.courseService = courseService;
  }

  async generateLessons(req: RequestWithUser, res: Response) {
    try {
      if (!req.body.user) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      const userId = req.body.user.userId;
      await this.courseService.generateLessons(userId);
      res.status(200).json({ message: 'Lessons generated successfully' });
    } catch (error) {
      console.error('Error generating lessons:', error);
      res.status(500).json({ message: 'Failed to generate lessons' });
    }
  }
}
