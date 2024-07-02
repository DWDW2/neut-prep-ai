import { Request, Response } from 'express';
import CriticalController from './critical.controller';
import MathController from './math.controller';
import { nuetTestModelType } from '../types/useNuet.types';
import { INuetTestModelType } from '../models/nuet.models';
import { Nuet } from '../models/nuet.models';
export default class NuetCombinedController {
  private criticalController: CriticalController;
  private mathController: MathController;
  nuetController: any;


  constructor(
    criticalController: CriticalController,
    mathController: MathController,

  ) {
    this.criticalController = criticalController;
    this.mathController = mathController;
  }
  async createNuetData(nuetData: { critical: string; math: string }): Promise<INuetTestModelType> {
    const newNuet = new Nuet({
      critical: nuetData.critical,
      math: nuetData.math,
    });
    return newNuet.save();
  }

  async getNuetCombined(req: Request, res: Response) {
    try {
      const criticalId = await this.criticalController.getCritical(req, res);
      const mathId = await this.mathController.getMath(req, res);

      if (criticalId && criticalId.id && mathId && mathId.id && typeof criticalId.id === 'string' && typeof mathId.id === 'string' ) {
        const newNuetData = {
          critical: criticalId.id,
          math: mathId.id,
        };

        const nuetId = await this.createNuetData(newNuetData)

        res.json({ id: nuetId._id });
        return { id: nuetId._id }
      } else {
        res.status(500).send('Error retrieving critical or math IDs');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
    
  }
}
