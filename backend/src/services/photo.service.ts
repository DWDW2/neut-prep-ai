import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { MulterFile } from '../types/multerFile';

const rename = promisify(fs.rename);

class PhotoService {
  public async savePhoto(file: MulterFile): Promise<string> {
    const targetPath = path.join(__dirname, '../../data', file.originalname);
    await rename(file.path, targetPath);
    return targetPath;
  }
}

export default new PhotoService();
