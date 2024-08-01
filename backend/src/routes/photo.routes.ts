import { Router } from 'express';
import multer from 'multer';
import photoController from '../controllers/photo.controller';

const router = Router();

const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true); 
  } else {
    cb(null, false); 
  }
};

const upload = multer({
  dest: 'data/',
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } 
});

router.post('/upload', upload.single('photo'), photoController.uploadPhoto);

export default router;
