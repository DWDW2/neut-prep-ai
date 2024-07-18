import 'dotenv/config'
import express, { type Request, type Response } from 'express';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import CriticalRouter from './routes/critical.routes'
import MathRouter from './routes/math.routes'
import RoadMapRouter from './routes/roadmap.routes'
import UserRouter from './routes/user.routes'
import CourseRoute from './routes/course.routes'
import cors from 'cors';
import { HttpCode, ONE_HUNDRED, ONE_THOUSAND, SIXTY } from './core/constants/index';
import { logger } from './logger';
import connectdb from './core/connectdb';
// import {
//     createClerkClient,
//     ClerkExpressRequireAuth,
//     LooseAuthProp,
//     clerkClient
//   } from '@clerk/clerk-sdk-node';

interface ServerOptions {
 port: number;
}
// declare global {
//     namespace Express {
//       interface Request extends LooseAuthProp {}
//     }
//   }
//   const authorizedParties = ['http://localhost:3000', 'https://example.com'];

//   export const clerk = createClerkClient({ jwtKey: process.env.JWT_SECRET!, secretKey: process.env.CLERK_SECRET_KEY!, publishableKey: process.env.CLERK_PUBLISHABLE_KEY!});

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
  // this.app.use(ClerkExpressRequireAuth({authorizedParties}))
  connectdb()
  this.app.use(logger)
  this.app.use('/critical', CriticalRouter);
  this.app.use('/math', MathRouter);
  this.app.use('/roadmap', RoadMapRouter);
  this.app.use('/user', UserRouter);
  this.app.use('/course', CourseRoute)
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