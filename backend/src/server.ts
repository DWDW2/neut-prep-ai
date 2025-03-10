import 'dotenv/config'
import express, { type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import PracticeRouter from './routes/practice.routes'
import RoadMapRouter from './routes/roadmap.routes'
import UserRouter from './routes/user.routes'
import CourseRoute from './routes/course.routes'
import PhotoRouter from './routes/photo.routes'
import cors from 'cors';
import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants/index';
import { logger } from './logger';
import connectdb from './core/connectdb';

interface ServerOptions {
 port: number;
}

export class Server {
 private readonly app = express();
 private readonly port: number;
 constructor(options: ServerOptions) {
  const { port } = options;
  this.port = port;
 }
 

 async start(): Promise<void> {
  this.app.use(express.json()); 
  this.app.use(express.urlencoded({ extended: true })); 
  this.app.use(compression());
  this.app.use(cors())
  connectdb()
  this.app.use(logger)  
  this.app.use('/roadmap', RoadMapRouter);
  this.app.use('/user', UserRouter);
  this.app.use('/course', CourseRoute)
  this.app.use('/practice', PracticeRouter)
  this.app.use('/photo', PhotoRouter)
  this.app.get('/health', (_req: Request, res: Response) => {
     res.send('Sever health')
  })
  this.app.get('/error', (_req: Request, res: Response) => {
   return res.status(HttpCode.INTERNAL_SERVER_ERROR).send({
    message: 'Internal Server Error'
   });
  });

  this.app.listen(this.port, () => {
   console.log(`Server running on port ${this.port}...`);
  });
 }
}