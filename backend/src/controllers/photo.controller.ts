import { Request, Response } from 'express';
import photoService from '../services/photo.service';

class PhotoController {
  public async uploadPhoto(req: Request, res: Response): Promise<void> {
    try {
      if (req.file === undefined) {
        res.status(400).send('No file uploaded or invalid file type.');
        return;
      }    
      const file = req.file;
      const filePath = await photoService.savePhoto(file);
      res.status(201).send({ message: 'File uploaded successfully', path: filePath });
    } catch (error: any) {
      console.error(error); 
      if (error.message.includes('Invalid file type')) {
        res.status(400).send(error.message);
      } else {
        res.status(500).send('An error occurred during file upload.');
      }
    }
  }
}

export default new PhotoController();
